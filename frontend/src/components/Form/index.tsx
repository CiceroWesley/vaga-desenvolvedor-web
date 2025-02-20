import React, { useState } from 'react'
import { FormWrapper, Input, ErrorMessage, Button } from '../../styled';
import users from '../../services/users';
import { AxiosError } from 'axios';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormProps {
    getUsers: () => Promise<void>; // Espera uma função assíncrona que retorna uma Promise
}

const Form = ({ getUsers }: FormProps) => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = (): boolean => {
        const formErrors: { name?: string; email?: string; message?: string } = {};
        let isValid = true;

        if (!formData.name) {
            formErrors.name = 'Nome é obrigatório';
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailRegex.test(formData.email)) {
            formErrors.email = 'Email inválido';
            isValid = false;
        }

        if (!formData.message) {
            formErrors.message = 'Mensagem é obrigatória';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const { data } = await users.createUser(formData)
                if (data) {
                    alert('Usuário criado com sucesso')
                    await getUsers()
                }
            } catch (error: any) {
                alert(error.response.data.message[0])
                console.log(error.response.data.message[0])
            }
            // Resetar o formulário
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Nome</label>
                <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </div>

            <div>
                <label htmlFor="email">E-mail</label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </div>

            <div>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                />
                {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
            </div>

            <Button type="submit">Enviar</Button>
        </FormWrapper>
    );
};
export default Form