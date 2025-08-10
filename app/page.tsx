"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  CheckCircle,
  Smartphone,
  BarChart3,
  Users,
  Zap,
  QrCode,
  MessageSquare,
  Package,
  FileText,
  // Check, retornar se for usar a sessão dos preços
  ArrowRight,
  Play,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  SquareMenu,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

export default function RestaurantSaaSLanding() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    restaurante: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in-section");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          phone: formData.telefone,
          restaurant: formData.restaurante,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage("Obrigado! Entraremos em contato em até 24 horas.");
        setFormData({
          nome: "",
          telefone: "",
          email: "",
          restaurante: "",
        });
      } else {
        setSubmitMessage(
          result.error || "Erro ao enviar formulário. Tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitMessage("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-main-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-overlay-gradient pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-glow-yellow rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-glow-pink rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" />
{/* 
  return (
    <div className="min-h-screen relative overflow-hidden"> */}
      {/* Background Effects */}
      {/* <div className="fixed inset-0 bg-overlay pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-glow-primary rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-glow-primary rounded-full blur-3xl pointer-events-none animate-pulse delay-1000" /> */}

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg shadow-black/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#b1b1b1] to-gray-400 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 hover:opacity-100 transition-opacity duration-300"></div>
              <Smartphone className="w-6 h-6 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              RestaurantePro
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#beneficios"
              className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 relative group"
            >
              Benefícios
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f2a516] to-[#f27405] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#como-funciona"
              className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 relative group"
            >
              Como Funciona
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f2a516] to-[#f27405] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#precos"
              className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 relative group"
            >
              Preços
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f2a516] to-[#f27405] group-hover:w-full transition-all duration-300"></div>
            </Link>
            <Link
              href="#faq"
              className="text-gray-600 hover:text-gray-800 transition-all duration-300 hover:scale-105 relative group"
            >
              FAQ
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#f2a516] to-[#f27405] group-hover:w-full transition-all duration-300"></div>
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-gray-800 to-[#b1b1b1] hover:from-gray-900 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f2a516]/20 to-[#f27405]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Entre em Contato!</span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center fade-in-section">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge
                  variant="outline"
                  className="border-gray-300 text-gray-700 bg-white/80 backdrop-blur-sm hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f2a516]/10 to-[#f27405]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Revolucione seu restaurante</span>
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    Cardápio Digital e Pedidos
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-gray-700 via-[#b1b1b1] to-gray-600 bg-clip-text text-transparent relative">
                    em Tempo Real
                    <div className="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-[#f2a516] to-[#f27405] opacity-60"></div>
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Transforme a experiência dos seus clientes com nosso sistema completo: cardápio digital, pedidos
                  direto da mesa e gestão em tempo real para sua equipe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-800 to-[#b1b1b1] hover:from-gray-900 hover:to-gray-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#f2a516]/20 to-[#f27405]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    Entre em Contato
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sem necessidade de cartão</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Configuração em 5 minutos</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 to-gray-100/40 rounded-3xl p-8 shadow-2xl shadow-gray-500/10 border border-white/50">
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f2a516]/5 to-[#f27405]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Vídeo (YouTube Lite) */}
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    <LiteYouTubeEmbed
                      id="kduZuW4A54I"
                      title="Demonstração RestaurantePro"
                      poster="hqdefault"
                      noCookie
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-gray-300/20 to-gray-400/15 rounded-full blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-gray-400/15 to-gray-300/20 rounded-round blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading">
              Por que escolher o RestaurantePro?
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Benefícios comprovados que transformam a operação do seu
              restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Pedidos 3x Mais Rápidos",
                description:
                  "Elimine filas e agilize o atendimento com pedidos direto da mesa",
                gradient: "benefit-1",
              },
            {
              icon: CheckCircle,
              title: "Zero Erros de Pedido",
              description:
                "Sistema digital elimina erros de comunicação entre cliente e cozinha",
                gradient: "benefit-2",
            },
            {
              icon: Smartphone,
              title: "Menu Digital Personalizável",
              description:
                "Atualize preços e pratos em tempo real, sem custos de impressão",
                gradient: "benefit-3",
            },
            {
              icon: BarChart3,
              title: "Relatórios Inteligentes",
              description:
                "Acompanhe vendas, pratos mais pedidos e performance em tempo real",
                gradient: "benefit-4",
            },
            {
              icon: Users,
              title: "Experiência do Cliente",
              description:
                "Interface intuitiva que encanta clientes e aumenta satisfação",
                gradient: "benefit-5",
            },
            {
              icon: Smartphone,
              title: "Responsivo para Mobile",
              description:
                "Conecte com sistemas de pagamento, delivery e gestão existentes",
                gradient: "benefit-6",
            },
          ].map((benefit, index) => (
              <Card
                key={index}
                className="fade-in-section backdrop-blur-xl bg-glass border-glass hover:bg-glass-hover transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-glass group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${benefit.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <benefit.icon className="w-8 h-8 text-on-brand" />
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-secondary text-base leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-500 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Processo simples em 3 etapas para revolucionar seu restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Cliente Acessa o Menu",
                description:
                  "Cliente é levado direto ao cardápio digital personalizado",
                icon: SquareMenu,
                gradient: "benefit-1",
              },
            {
              step: "02",
              title: "Realiza o Pedido",
              description:
                "Interface intuitiva permite personalização e envio direto à cozinha",
              icon: Smartphone,
              gradient: "benefit-5",
            },
            {
              step: "03",
              title: "Equipe Recebe em Tempo Real",
              description:
                "Funcionários acompanham pedidos e status de preparo instantaneamente",
              icon: Users,
              gradient: "benefit-2",
            },
          ].map((step, index) => (
              <div
                key={index}
                className="text-center space-y-6 fade-in-section"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative">
                  <div
                    className={`w-20 h-20 ${step.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className="w-10 h-10 text-on-brand" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 backdrop-blur-xl bg-glass border border-glass rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-primary">
                      {step.step}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demonstração do Produto */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Veja o Sistema em Ação
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Demonstração completa das funcionalidades que vão transformar seu restaurante
            </p>
          </div>

          <div className="max-w-4xl mx-auto fade-in-section">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/60 to-gray-100/40 rounded-3xl p-8 shadow-2xl shadow-gray-500/10 border border-white/50">
              <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f2a516]/5 to-[#f27405]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Vídeo (YouTube Lite) */}
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <LiteYouTubeEmbed
                    id="kduZuW4A54I"
                    title="Demonstração RestaurantePro — Completo"
                    poster="hqdefault"
                    noCookie
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center space-y-4">
              <p className="text-lg text-gray-600">
                Interface intuitiva • Responsivo • Tempo real • Personalizável
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrações e Funcionalidades */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold text-heading">
              Funcionalidades Completas
            </h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              Tudo que você precisa para modernizar seu restaurante em uma única
              plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: QrCode,
                title: "QR Code Inteligente",
                gradient: "from-yellow-500 to-orange-500",
              },
            {
              icon: MessageSquare,
              title: "Integração WhatsApp",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Package,
                title: "Controle de Estoque",
                gradient: "from-orange-500 to-violet-500",
              },
              {
                icon: FileText,
                title: "Relatórios Avançados",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: Users,
                title: "Modo Garçom",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: Smartphone,
                title: "App Mobile",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: BarChart3,
                title: "Dashboard Analytics",
                gradient: "from-yellow-500 to-amber-500",
              },
              {
                icon: Zap,
                title: "Notificações Push",
                gradient: "from-teal-500 to-cyan-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="fade-in-section text-center p-6 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/20 hover:bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-slate-800">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      {/* <section id="precos" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/60 to-white/80 backdrop-blur-3xl" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Planos que Cabem no seu Orçamento
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para o tamanho do seu restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Grátis",
              price: "R$ 0",
              period: "/mês",
              description: "Perfeito para testar",
              features: [
                "Até 5 mesas",
                "Menu digital básico",
                "Pedidos em tempo real",
                "Suporte por email",
              ],
              cta: "Começar Grátis",
              popular: false,
            },
            {
              name: "Profissional",
              price: "R$ 97",
              period: "/mês",
              description: "Ideal para restaurantes médios",
              features: [
                "Mesas ilimitadas",
                "Menu personalizado",
                "Relatórios avançados",
                "Integração WhatsApp",
                "Suporte prioritário",
              ],
              cta: "Escolher Plano",
              popular: true,
            },
            {
              name: "Premium",
              price: "R$ 197",
              period: "/mês",
              description: "Para redes e grandes restaurantes",
              features: [
                "Múltiplas unidades",
                "Dashboard executivo",
                "API personalizada",
                "Treinamento incluso",
                "Suporte 24/7",
              ],
              cta: "Falar com Vendas",
              popular: false,
            },
          ].map((plan, index) => (
              <Card
                key={index}
                className={`fade-in-section relative backdrop-blur-xl border-2 ${
                  plan.popular
                    ? "bg-gradient-to-br from-white/80 to-gray-50/60 border-gray-300 shadow-2xl shadow-gray-500/20 scale-105"
                    : "bg-white/60 border-gray-200/50"
                } hover:shadow-2xl hover:shadow-gray-500/10 transition-all duration-500 hover:-translate-y-2`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-gray-800 to-[#b1b1b1] text-white px-4 py-1 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray/20 to-[#b1b1b1]"></div>
                      <span className="relative z-10">Mais Popular</span>
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-gray-800">
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full transition-all duration-300 hover:scale-105 relative overflow-hidden group ${
                      plan.popular
                        ? "bg-gradient-to-r from-gray-800 to-[#b1b1b1] hover:from-gray-900 hover:to-gray-600 text-white shadow-lg"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50 backdrop-blur-sm bg-white/80"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#f2a516]/10 to-[#f27405]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                    <span className="relative z-10">{plan.cta}</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section id="faq" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16 fade-in-section">
            <h2 className="text-3xl lg:text-4xl font-bold text-dark-gradient">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-slate-primary max-w-2xl mx-auto">
              Tire suas dúvidas sobre o RestaurantePro
            </p>
          </div>

          <div className="max-w-3xl mx-auto fade-in-section">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "Como funciona a implementação no meu restaurante?",
                answer:
                  "A implementação é super simples! Nossa equipe faz toda a configuração em até 24 horas. Você só precisa nos enviar seu cardápio e fotos dos pratos. Fornecemos QR codes personalizados e treinamento para sua equipe.",
              },
              {
                question: "Preciso de internet para o sistema funcionar?",
                answer:
                  "Sim, é necessária conexão com internet para sincronização em tempo real.",
              },
              {
                question: "Posso personalizar o visual do cardápio?",
                answer:
                  "Absolutamente! Você pode personalizar cores, logo, fotos dos pratos, descrições e preços. Tudo pode ser alterado em tempo real através do painel administrativo, sem necessidade de conhecimento técnico.",
              },
              {
                question: "Como funciona o suporte técnico?",
                answer:
                  "Oferecemos suporte via WhatsApp, email e telefone. Temos suporte 24/7. Também fornecemos materiais de treinamento e tutoriais em vídeo.",
              },
              {
                question: "Posso cancelar a qualquer momento?",
                answer:
                  "Sim, não há fidelidade. Você pode cancelar a qualquer momento e continuar usando até o final do período pago. Todos os seus dados ficam seguros e você pode exportá-los quando quiser.",
              },
            ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="backdrop-blur-xl bg-white/40 border border-white/20 rounded-2xl px-6 hover:bg-white/60 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-800 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Chamada Final - Updated with working form */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-500 backdrop-blur-xl" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12 fade-in-section">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Pronto para Revolucionar seu Restaurante?
              </h2>
              <p className="text-xl text-gray-200 leading-relaxed">
                Preencha o formulário abaixo para entrarmos em contato em até 24 horas. Veja como centenas de
                restaurantes já transformaram sua operação.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Formulário */}
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 shadow-2xl shadow-black/20 border border-white/20 fade-in-section">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      Entre em Contato!
                    </h3>
                    <p className="text-slate-600">
                      Sem compromisso • Resposta em 24h
                    </p>
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-4 rounded-xl text-center ${
                        submitMessage.includes("Obrigado")
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="nome"
                          className="text-sm font-medium text-slate-700"
                        >
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm bg-white/80 transition-all duration-300"
                          placeholder="Nome completo"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="telefone"
                          className="text-sm font-medium text-slate-700"
                        >
                          WhatsApp *
                        </label>
                        <input
                          type="tel"
                          id="telefone"
                          name="telefone"
                          value={formData.telefone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm bg-white/80 transition-all duration-300"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium text-slate-700"
                      >
                        Email Profissional *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm bg-white/80 transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="restaurante"
                        className="text-sm font-medium text-slate-700"
                      >
                        Nome do Restaurante *
                      </label>
                      <input
                        type="text"
                        id="restaurante"
                        name="restaurante"
                        value={formData.restaurante}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent backdrop-blur-sm bg-white/80 transition-all duration-300"
                        placeholder="Nome do seu restaurante"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white py-4 text-lg font-semibold shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : "Entrar em Contato"}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <p className="text-xs text-slate-500 text-center leading-relaxed">
                      Ao enviar este formulário, você concorda em receber
                      comunicações da RestaurantePro. Seus dados estão
                      protegidos pela nossa Política de Privacidade.
                    </p>
                  </form>
                </div>
              </div>

              {/* Benefícios do lado direito */}
              <div className="space-y-8 fade-in-section">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    O que você vai receber:
                  </h3>

                  <div className="space-y-4">
                    {[
                      {
                        icon: CheckCircle,
                        title: "Demonstração Personalizada",
                        description:
                          "Vídeo-chamada de 30 minutos mostrando o sistema funcionando com seu cardápio",
                      },
                      {
                        icon: Clock,
                        title: "Análise Gratuita",
                        description:
                          "Relatório personalizado com oportunidades de melhoria para seu restaurante",
                      },
                      {
                        icon: Zap,
                        title: "Proposta Comercial",
                        description:
                          "Plano personalizado com desconto especial para implementação",
                      },
                    ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 backdrop-blur-xl bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-white/30">
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-semibold text-white">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center fade-in-section">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-white">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Sem necessidade de cartão</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Resposta em até 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="backdrop-blur-xl bg-white/40 py-12 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  RestaurantePro
                </span>
              </div>
              <p className="text-slate-600">
                Transformando restaurantes com tecnologia inteligente e foco na
                experiência do cliente.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Produto</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Preços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Demonstração
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Integrações
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Suporte</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Contato
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Treinamentos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Status do Sistema
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800">Legal</h3>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    LGPD
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-slate-800 transition-colors duration-300"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} RestaurantePro. Todos os
              direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
