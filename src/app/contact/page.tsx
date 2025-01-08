"use client"; // Isso ativa o modo cliente, necessário para usar o estado no React

import { useState } from "react";

export default function Contact() {
    // Estado para armazenar os valores dos campos
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    // Estado para mensagens de erro e sucesso
    const [formStatus, setFormStatus] = useState<{
        message: string;
        type: string;
    }>({
        message: "",
        type: "",
    });

    // Função para lidar com mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificação básica
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setFormStatus({ message: "Todos os campos são obrigatórios.", type: "error" });
            return;
        }

        // Aqui você pode adicionar o envio real do formulário, como integração com um servidor ou API.
        // Exemplo de envio simulado:
        setFormStatus({ message: "Mensagem enviada com sucesso! Em breve entrarei em contato.", type: "success" });

        // Limpar o formulário após o envio
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
        });
    };

    return (
        <div className="max-w-screen-xl mx-auto p-8">
            <h2 className="text-4xl font-semibold text-indigo-600 mb-4">Entre em Contato</h2>

            {/* Mensagem de status */}
            {formStatus.message && (
                <div
                    className={`p-4 mb-6 rounded-md ${formStatus.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                >
                    {formStatus.message}
                </div>
            )}

            <p className="text-lg text-gray-700 mb-8">
                Caso queira discutir projetos, parcerias ou oportunidades, preencha o formulário abaixo ou entre em
                contato pelo e-mail:
            </p>
            <a href="mailto:raineroliveira94@hotmail.com" className="text-indigo-600 hover:underline">
                raineroliveira94@hotmail.com
            </a>

            {/* Formulário de contato */}
            <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Seu nome"
                            required
                        />
                    </div>

                    {/* E-mail */}
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Seu e-mail"
                            required
                        />
                    </div>
                </div>

                {/* Assunto */}
                <div className="mt-6">
                    <label htmlFor="subject" className="block text-lg font-medium text-gray-700">Assunto</label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Assunto da mensagem"
                        required
                    />
                </div>

                {/* Mensagem */}
                <div className="mt-6">
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700">Mensagem</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Sua mensagem"
                        required
                    ></textarea>
                </div>

                {/* Botão de Enviar */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Enviar Mensagem
                    </button>
                </div>
            </form>
        </div>
    );
}
