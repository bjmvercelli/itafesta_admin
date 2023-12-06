import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";

// import Table from '../components/Table.js';
import { Button, Form, Input, Modal, Table, notification } from "antd";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import SupplierModalForm from "../components/SupplierModalForm";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  header: {
    marginBottom: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 40,

    "& > button": {
      width: 200,
      height: 40,
      marginBottom: 0,
      // padding: 0,
    },

    "& .ant-input-search-button": {
      height: 40,
      margin: 0,
    },
  },
  content: {
    marginTop: 15,
  },
  formStyle: {
    "& .ant-form-item-label": {
      width: 100,
    },
  },
}));

const DataTablePage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Serviço",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Endereço",
      dataIndex: "endereco",
      key: "endereco",
    },
    {
      title: "Telefone",
      dataIndex: "telefone",
      key: "telefone",
    },
    {
      title: "",
      dataIndex: "acoes",
      key: "acoes",
      fixed: "right",
      width: 200,
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="default"
            icon={<EditOutlined fontSize="small" />}
            onClick={() => {
              setInitialValues(record);
              setShowModal("edit");
            }}
          />
          <Button
            type="default"
            icon={<DeleteOutline color="error" />}
            style={{ marginLeft: 20 }}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNotification = (type, message, description) => {
    api[type]({
      message,
      description,
    });
  };

  const handleFetch = () => {
    setLoading(true);
    fetch("https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedores")
      .then((response) => response.json())
      .then((response) => setData(response.data))
      .catch((error) => {
        console.log(error);
        showNotification(
          "error",
          "Erro ao buscar fornecedores!",
          "Ocorreu um erro ao buscar os fornecedores!"
        );
      })
      .finally(() => setLoading(false));
  };

  const handleCreate = () => {
    const values = form.getFieldsValue();

    const senha = "123";

    fetch("https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedores", {
      method: "POST",
      body: JSON.stringify({
        ...values,
        senha,
        aberto: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          setShowModal(false);
          form.resetFields();
          handleFetch();
          showNotification(
            "success",
            "Fornecedor criado com sucesso!",
            "O fornecedor foi criado com sucesso!"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = () => {
    const values = formEdit.getFieldsValue();

    fetch(
      `https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedor/${initialValues.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...values,
          senha: "123",
          aberto: true,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setShowModal(false);
          handleFetch();
          showNotification(
            "success",
            "Fornecedor editado com sucesso!",
            "O fornecedor foi editado com sucesso!"
          );
        }
      })
      .catch((error) => {
        console.log(error);
        showNotification(
          "error",
          "Erro ao editar fornecedor!",
          "Ocorreu um erro ao editar o fornecedor!"
        );
      });
  };

  const handleDelete = (id) => {
    fetch(`https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedor/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          handleFetch();
          showNotification(
            "success",
            "Fornecedor deletado com sucesso!",
            "O fornecedor foi deletado com sucesso!"
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (value) => {
    setLoading(true);
    fetch("https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedores")
      .then((response) => response.json())
      .then((response) => {
        const filteredData = response.data?.filter((item) =>
          item.nome.toLowerCase().includes(value.toLowerCase())
        );

        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
        showNotification(
          "error",
          "Erro ao filtrar fornecedores!",
          "Ocorreu um erro ao filtrar os fornecedores!"
        );
      })
      .finally(() => setLoading(false));
  };

  const GetModal = useCallback(() => {
    if (showModal === "create") {
      return (
        <Modal
          title="Adicionar fornecedor"
          onCancel={() => setShowModal(false)}
          open={showModal}
          footer={[
            <Button key="back" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={() => handleCreate()}>
              Salvar
            </Button>,
          ]}
        >
          <SupplierModalForm
            form={form}
            handleFinish={handleCreate}
            initialValues={{}}
          />
        </Modal>
      );
    }

    if (showModal === "edit") {
      return (
        <Modal
          title="Editar fornecedor"
          onCancel={() => {
            setInitialValues({});
            setShowModal(false);
          }}
          open={showModal}
          footer={[
            <Button key="back" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>,
            <Button key="submit" type="primary" onClick={() => handleEdit()}>
              Salvar
            </Button>,
          ]}
        >
          <SupplierModalForm
            form={formEdit}
            handleFinish={handleEdit}
            initialValues={initialValues}
          />
        </Modal>
      );
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, initialValues, form, formEdit]);

  return (
    <div className={classes.root}>
      {contextHolder}
      <div className={classes.content}>
        <div className={classes.header}>
          <Input.Search
            placeholder="Buscar fornecedor"
            style={{ maxWidth: "800px", borderRadius: "50%" }}
            onSearch={(value) => handleSearch(value)}
          />
          <Button type="primary" onClick={() => setShowModal("create")}>
            Adicionar
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          loading={loading}
          pagination={{
            pageSize: 10,
            total: data.length,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
          }}
        />
        {showModal && <GetModal />}
      </div>
    </div>
  );
};

export default DataTablePage;
