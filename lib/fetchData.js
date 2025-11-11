// lib/fetchData.js
import { supabase } from './supabaseClient'

/**
 * Fetches raw data from Supabase for the given table.
 * Does not alter or post-process anything.
 * @param {string} table - The table name ('las', 'lamf', 'mtf')
 * @returns {Promise<Array>} - Raw rows from the table
 */

export async function fetchTableData(table) {
  const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true })
  if (error) {
    console.error(`❌ Error fetching ${table}:`, error.message)
    return []
  }
  return data || []
}

// Convenience wrappers for your three tables
export const fetchLAS = () => fetchTableData('las')
export const fetchLAMF = () => fetchTableData('lamf')
export const fetchMTF = () => fetchTableData('mtf')
export const DEFAULT_NULL_TEXT = "Data publicly not available"