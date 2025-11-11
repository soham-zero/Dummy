"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { fetchLAMF } from "@/lib/fetchData";
import { Plus, Save, X, Trash2 } from "lucide-react";

// LAMF schema definition
const lamfSchema = {
  id: { type: "serial", editable: false },
  institution_name: { type: "text", editable: true },
  approved_funds: { type: "number", editable: true },
  tenure_months: { type: "number", editable: true },
  loan_equity: { type: "json", editable: true },
  loan_debt: { type: "json", editable: true },
  interest_rate: { type: "json", editable: true },
  ltv: { type: "json", editable: true },
  processing_fee: { type: "text", editable: true },
  prepayment_charges: { type: "text", editable: true },
  annual_maintenance: { type: "text", editable: true },
  penal_charges: { type: "number", editable: true },
  regularization_period: { type: "text", editable: true },
  default_charges: { type: "json", editable: true },
  other_expenses: { type: "json", editable: true },
  cost_first_year: { type: "json", editable: true },
  cost_second_year: { type: "json", editable: true },
};

export default function AdminLAMFPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [modalEditor, setModalEditor] = useState({
    show: false,
    rowId: null,
    key: null,
    type: null,
    value: null,
    isNewRow: false,
  });

  // 🔐 Verify Admin
  useEffect(() => {
    const verifyUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        router.replace("/admin/login");
        return;
      }
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: data.user.id }),
      });
      const result = await res.json();
      if (!result.isAdmin) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }
      setUser(data.user);
    };
    verifyUser();
  }, [router]);

  // 📦 Fetch LAMF data
  useEffect(() => {
    const getData = async () => {
      const fresh = await fetchLAMF();
      setData(fresh);
      setOriginalData(fresh);
      setLoading(false);
    };
    getData();
  }, []);

  // 💡 Detect Changes
  useEffect(() => {
    const isDifferent =
      JSON.stringify(data) !== JSON.stringify(originalData) ||
      newRows.length > 0 ||
      deletedIds.length > 0;
    setHasChanges(isDifferent);
  }, [data, originalData, newRows, deletedIds]);

  // ➕ Add Row
  const handleAddRow = () => {
    const emptyRow = Object.fromEntries(Object.keys(lamfSchema).map((k) => [k, null]));
    const maxExistingId = Math.max(0, ...data.map((r) => Number(r.id) || 0));
    emptyRow.id = maxExistingId + 1;
    setNewRows((prev) => [...prev, emptyRow]);
  };

  // ❌ Delete Row
  const handleDeleteRow = (id) => {
    if (String(id).startsWith("new-")) {
      setNewRows((prev) => prev.filter((r) => r.id !== id));
    } else {
      setDeletedIds((prev) => [...prev, id]);
      setData((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // 💾 Save Changes
  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      for (const row of data) {
        const original = originalData.find((r) => r.id === row.id);
        if (original && JSON.stringify(original) !== JSON.stringify(row)) {
          await supabase.from("lamf").update(row).eq("id", row.id);
        }
      }
      if (newRows.length > 0) {
        const sanitized = newRows.map(({ id, ...rest }) => rest);
        await supabase.from("lamf").insert(sanitized);
      }
      if (deletedIds.length > 0) {
        await supabase.from("lamf").delete().in("id", deletedIds);
      }
      const fresh = await fetchLAMF();
      setData(fresh);
      setOriginalData(fresh);
      setNewRows([]);
      setDeletedIds([]);
      alert("✅ Changes saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  // 🔁 Cancel Changes
  const handleCancelChanges = () => {
    setData(originalData);
    setNewRows([]);
    setDeletedIds([]);
  };

  // ✏️ Modal Editor
  const openEditor = (rowId, key, type, value, isNewRow = false) =>
    setModalEditor({ show: true, rowId, key, type, value, isNewRow });
  const closeEditor = () =>
    setModalEditor({ show: false, rowId: null, key: null, type: null, value: null, isNewRow: false });

  const commitEdit = (newValue) => {
    const fieldType = lamfSchema[modalEditor.key].type;
    if (fieldType === "number" && newValue !== "" && isNaN(Number(newValue))) {
      alert("❌ Invalid data type: expected a number.");
      return;
    }

    const valueToSet =
      newValue === "" || newValue === null
        ? null
        : fieldType === "number"
        ? Number(newValue)
        : newValue;

    const updater = (rows) =>
      rows.map((r) =>
        r.id === modalEditor.rowId ? { ...r, [modalEditor.key]: valueToSet } : r
      );

    modalEditor.isNewRow ? setNewRows((prev) => updater(prev)) : setData((prev) => updater(prev));
    closeEditor();
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">Loading LAMF table...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">LAMF Admin Dashboard</h1>

      {/* Control Bar */}
      <div className="flex justify-between mb-6">
        <button onClick={handleAddRow} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          <Plus size={18} /> Add Row
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges || saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              !hasChanges || saving ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <Save size={18} /> {saving ? "Saving..." : hasChanges ? "Save Changes" : "No Changes"}
          </button>
          <button onClick={handleCancelChanges} className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
            <X size={18} /> Cancel
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-xl border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              {Object.keys(lamfSchema).map((key) => (
                <th key={key} className="px-4 py-3 border-b text-gray-700 max-w-[240px] truncate">
                  {key} <span className="text-xs text-gray-500">({lamfSchema[key].type})</span>
                </th>
              ))}
              <th className="px-4 py-3 border-b text-center text-gray-700 sticky right-0 bg-gray-100 z-10">Actions</th>
            </tr>
          </thead>

          <tbody>
            {[...data, ...newRows].map((row, idx) => (
              <tr key={row.id || `new-${idx}`} className="border-b hover:bg-gray-50">
                {Object.keys(lamfSchema).map((key) => {
                  const field = lamfSchema[key];
                  const val = row[key];
                  const display = field.type === "json" && val ? Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(", ") : val ?? "";
                  return (
                    <td
                      key={key}
                      onClick={() =>
                        field.editable &&
                        openEditor(row.id, key, field.type, val || (field.type === "json" ? {} : ""), newRows.includes(row))
                      }
                      className={`px-4 py-2 max-w-[220px] truncate cursor-pointer ${
                        field.editable ? "hover:bg-blue-50" : "bg-gray-50"
                      }`}
                      title={display}
                    >
                      {display || <span className="text-gray-400 italic">NULL</span>}
                    </td>
                  );
                })}
                <td className="px-4 py-2 sticky right-0 bg-white text-center">
                  <button onClick={() => handleDeleteRow(row.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* JSON Modal (Same as LAS) */}
      {modalEditor.show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[650px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex justify-between items-center">
              Editing Field: <span className="text-blue-600">{modalEditor.key}</span>
              <button onClick={closeEditor} className="text-gray-500 hover:text-black">
                <X size={18} />
              </button>
            </h3>

            {modalEditor.type === "json" ? (
              <div className="space-y-3">
                {Object.entries(modalEditor.value).map(([k, v], i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      className="border px-2 py-1 rounded w-1/2"
                      defaultValue={k}
                      onBlur={(e) => {
                        const newKey = e.target.value.trim();
                        const newVal = { ...modalEditor.value };
                        if (newKey === "") return alert("⚠️ Key cannot be empty.");
                        if (newKey !== k && newKey in newVal) return alert("⚠️ Duplicate key detected!");
                        const temp = newVal[k];
                        delete newVal[k];
                        newVal[newKey] = temp;
                        setModalEditor((prev) => ({ ...prev, value: newVal }));
                      }}
                    />
                    <input
                      className="border px-2 py-1 rounded w-1/2"
                      value={v}
                      onChange={(e) =>
                        setModalEditor((prev) => ({
                          ...prev,
                          value: { ...prev.value, [k]: e.target.value },
                        }))
                      }
                    />
                    <button
                      onClick={() => {
                        const newVal = { ...modalEditor.value };
                        delete newVal[k];
                        setModalEditor((prev) => ({ ...prev, value: newVal }));
                      }}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setModalEditor((prev) => ({ ...prev, value: { ...prev.value, "": "" } }))}
                  className="text-xs text-gray-600 hover:text-black mt-2"
                >
                  + Add Field
                </button>
              </div>
            ) : (
              <textarea
                rows={6}
                className="border px-3 py-2 w-full rounded text-sm"
                value={modalEditor.value || ""}
                onChange={(e) => setModalEditor((prev) => ({ ...prev, value: e.target.value }))}
              />
            )}

            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => commitEdit(modalEditor.value)} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                <Save size={16} /> Apply
              </button>
              <button onClick={closeEditor} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 flex items-center gap-2">
                <X size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
