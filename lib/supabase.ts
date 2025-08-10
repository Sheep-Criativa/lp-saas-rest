import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o formulário baseado na estrutura da tabela do Supabase
export interface LeadForm {
  id?: string
  name: string        // corresponde à coluna 'name' da tabela
  email: string       // corresponde à coluna 'email' da tabela  
  phone: string       // corresponde à coluna 'phone' da tabela
  restaurant: string  // corresponde à coluna 'restaurant' da tabela
  created_at?: string
  updated_at?: string
}

// Interface para os dados do formulário no frontend (nomes em português)
export interface FormData {
  nome: string
  email: string
  telefone: string
  restaurante: string
}