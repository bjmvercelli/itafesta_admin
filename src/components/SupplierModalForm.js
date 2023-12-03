import { Form, Input } from "antd";
import React from "react";

export default function ({
  form,
  handleFinish,
  initialValues
}) {
  if (Object.keys(initialValues).length === 0){
    initialValues = {
      nome: "",
      email: "",
      tipo: "",
      endereco: "",
      cnpj: "",
      telefone: "",
      descricao: "",
    }
  }

  return (
    <Form layout="vertical" initialValues={initialValues} form={form} onFinish={handleFinish}>
      <Form.Item
        label="Nome"
        name="nome"
        rules={[
          {
            required: true,
            message: "Por favor, insira o nome do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor, insira o email do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Serviço"
        name="tipo"
        rules={[
          {
            required: true,
            message: "Por favor, insira o serviço do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Endereço"
        name="endereco"
        rules={[
          {
            required: true,
            message: "Por favor, insira o endereço do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="CNPJ"
        name="cnpj"
        rules={[
          {
            required: true,
            message: "Por favor, insira o CNPJ do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Telefone"
        name="telefone"
        rules={[
          {
            required: true,
            message: "Por favor, insira o telefone do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="descricao"
        rules={[
          {
            required: true,
            message: "Por favor, insira a descrição do fornecedor!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
}
