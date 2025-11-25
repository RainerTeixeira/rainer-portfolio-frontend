/**
 * Exemplo de Componente Ultra-Otimizado
 * Demonstra as melhores práticas para performance máxima
 */

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { ArrowRight, Code2, Rocket, Zap } from 'lucide-react';

// Server Component (sem "use client") - renderiza no servidor
export default function ExemploOtimizado() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section - Todo conteúdo estático */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-secondary-600">
            Stack Ultra-Otimizada
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Performance máxima com Server Components, Tailwind CSS e Design Tokens
          </p>
        </div>

        {/* Grid de Features - Renderizado no servidor */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="Lightning Fast"
            description="Carregamento instantâneo com Server Components e PPR"
          />
          <FeatureCard
            icon={<Code2 className="w-6 h-6" />}
            title="Developer Experience"
            description="TypeScript, Hot Reload com Turbopack, e ferramentas modernas"
          />
          <FeatureCard
            icon={<Rocket className="w-6 h-6" />}
            title="Production Ready"
            description="Otimizado para SEO, acessibilidade e performance"
          />
        </div>

        {/* Suspense para carregamento assíncrono */}
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsSection />
        </Suspense>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            prefetch={true} // Prefetch automático da rota
          >
            Iniciar Projeto
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Componente de Feature Card (Server Component)
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// Componente assíncrono para projetos (pode fazer fetch de dados)
async function ProjectsSection() {
  // Simula fetch de dados (em produção, seria uma chamada real)
  const projects = await getProjects();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

// Card de Projeto com otimização de imagem
function ProjectCard({
  project,
}: {
  project: { id: string; title: string; image: string; description: string };
}) {
  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <div className="aspect-video relative">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy" // Lazy loading automático
          placeholder="blur" // Placeholder com blur
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." // Base64 do blur
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm">{project.description}</p>
      </div>
    </article>
  );
}

// Skeleton para loading state
function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-video bg-gray-200" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Função simulada de fetch (em produção seria uma API real)
async function getProjects() {
  // Simula delay de fetch
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  return [
    {
      id: '1',
      title: 'E-commerce Platform',
      image: '/images/project-1.jpg',
      description: 'Plataforma de vendas com checkout otimizado',
    },
    {
      id: '2',
      title: 'Dashboard Analytics',
      image: '/images/project-2.jpg',
      description: 'Painel de métricas em tempo real',
    },
    {
      id: '3',
      title: 'Mobile App',
      image: '/images/project-3.jpg',
      description: 'Aplicativo React Native cross-platform',
    },
  ];
}
