import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, restaurant } = body

    // Validação básica
    if (!name || !phone || !email || !restaurant) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Dados para inserir na tabela do Supabase
    const leadData = {
      name,
      email,
      phone,
      restaurant,
    }

    // Inserir no Supabase usando as colunas corretas
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()

    if (error) {
      console.error('Erro do Supabase:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Lead criado com sucesso!', 
        data: data[0] 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Método GET para listar leads (opcional, para uso futuro no admin)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('id, name, email, phone, restaurant, created_at, updated_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro do Supabase:', error)
      return NextResponse.json(
        { error: 'Erro interno do servidor' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data }, { status: 200 })

  } catch (error) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}