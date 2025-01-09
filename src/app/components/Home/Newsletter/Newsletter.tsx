import React from 'react'

const Newsletter = () => {
  return (
    // Container principal com padding superior e inferior
    <div className="pt-[5rem] pb-[5rem]">
      <div className="text-center">
        {/* Título da seção - chama a atenção do usuário para as atualizações */}
        <h1 className="text-[28px] sm:text-[38px] md:text-[50px] text-black font-bold uppercase">
          Inscreva-se para receber atualizações sobre meus projetos
        </h1>

        {/* Descrição explicativa sobre o conteúdo oferecido e o propósito do formulário */}
        <p className="text-black text-opacity-70 w-[85%] md:w-[60%] mx-auto">
          Sou desenvolvedor com experiência em criação de soluções inovadoras e projetos personalizados.
          Aqui você encontrará novidades sobre meus projetos, atualizações e insights sobre a tecnologia que estou utilizando.
          Inscreva-se para receber conteúdo exclusivo e acompanhar o desenvolvimento das minhas plataformas e sistemas.
        </p>

        {/* Container para os campos de entrada de dados (email) e o botão de inscrição */}
        <div className="flex items-center space-x-2 mt-[3rem] justify-center">

          {/* Campo de entrada para o email do usuário */}
          <input
            type="email"
            placeholder="Seu Email"  // Placeholder para o campo de email
            className="px-5 py-4 bg-gray-400 w-[40%] outline-none rounded-lg placeholder:text-black"
          />

          {/* Botão de inscrição que chama a atenção para a ação */}
          <button className="px-8 py-4 bg-green-700 hover:bg-green-900 transition-all duration-200 rounded-md text-white font-bold">
            Inscrever-se
          </button>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
