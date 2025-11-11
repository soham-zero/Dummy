'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Briefcase, LineChart, BarChart3, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Outfit } from 'next/font/google'

const outfit = Outfit({ weight: ['400', '600'], subsets: ['latin'] })

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        router.replace('/admin/login')
        return
      }

      // Server-side admin check
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: data.user.id }),
      })
      const result = await res.json()

      if (!result.isAdmin) {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    verifyUser()
  }, [router])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
        Verifying access...
      </div>
    )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const products = [
    {
      id: 'las',
      name: 'Loan Against Shares (LAS)',
      icon: Briefcase,
      gradient: 'from-emerald-400 to-emerald-600',
      link: './dashboard/las',
    },
    {
      id: 'lamf',
      name: 'Loan Against Mutual Funds (LAMF)',
      icon: LineChart,
      gradient: 'from-pink-400 to-pink-600',
      link: './dashboard/lamf',
    },
    {
      id: 'mtf',
      name: 'Margin Trading Facility (MTF)',
      icon: BarChart3,
      gradient: 'from-indigo-400 to-indigo-600',
      link: './dashboard/mtf',
    },
  ]

  return (
    <div
      className={`min-h-screen bg-gray-50 flex flex-col items-center py-20 px-6 ${outfit.className}`}
    >
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
      >
        <LogOut size={18} />
        Logout
      </button>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 text-center"
      >
        Admin Dashboard
      </motion.h1>

      <p className="text-gray-500 mb-14 text-lg text-center">
        Welcome, Het Doshi!! Manage your CompareFi product tables below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl items-stretch">
        {products.map(({ id, name, icon: Icon, gradient, link }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex"
          >
            <Link href={link} className="flex-grow">
              <Card
                className={`relative flex flex-col justify-between h-full bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-500`}
              >
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                <CardHeader className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white`}>
                    <Icon size={28} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-6 text-gray-600 text-base">
                  Manage and update data entries for {name.split('(')[1]?.replace(')', '') || id.toUpperCase()}.
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}