import Image from "next/image"

export default function SobrePage() {
  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL", 
    "MongoDB", "Docker", "AWS", "Git", "Agile", "Scrum"
  ]

  const experience = [
    {
      period: "2020 - Atual",
      role: "Desenvolvedor Full-Stack Freelancer",
      description: "Desenvolvimento de aplicações web e mobile para clientes diversos, focado em soluções escaláveis e modernas."
    },
    {
      period: "2018 - 2020",
      role: "Desenvolvedor Frontend",
      description: "Especialização em React e desenvolvimento de interfaces de usuário responsivas e acessíveis."
    },
    {
      period: "2016 - 2018",
      role: "Desenvolvedor Junior",
      description: "Início da carreira trabalhando com tecnologias web tradicionais e aprendendo as bases do desenvolvimento moderno."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header da página */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary shadow-lg">
              <Image
                src="/images/t2.jpg"
                alt="Rainer Teixeira - Desenvolvedor Full-Stack"
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">💻</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mim</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Sou um desenvolvedor Full-Stack apaixonado por tecnologia e inovação. Com mais de 8 anos de experiência no mercado, trabalho criando soluções digitais que fazem a diferença na vida das pessoas e empresas.
          </p>
        </div>
      </div>

      {/* Conteúdo da página com grid padrão */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experiência */}
          <div className="border-l-4 border-primary pl-6">
            <h2 className="text-2xl font-bold mb-4">Experiência</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Tecnologias</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}