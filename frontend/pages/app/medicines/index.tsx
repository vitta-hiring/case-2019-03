import DataTable from "../../../components/DataTable";
import { PaginationConfig, ColumnProps } from "antd/lib/table";
import {
  Popconfirm,
  Modal,
  Button,
  Form,
  Input,
  Select,
  Icon,
  Tag,
  Switch
} from "antd";
import { useEffect, Fragment, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  useSelector,
  useDispatch,
  useStore,
  shallowEqual,
  connect
} from "react-redux";

import { AppState } from "../../../store/ducks/rootReducer";
import {
  MedicineTypes,
  MedicineState,
  Medicine
} from "../../../store/ducks/medicines/types";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { DrugTypes } from "../../../store/ducks/drug/types";
import TableTransfer from "../../../components/TableTransfer";
import { withAuthSync } from "../../../utils/auth";

const { Option } = Select;

const DRUG_FETCH_PAGINATION = {
  pagination: { current: 1, pageSize: 15 }
};

const MEDICINE_FETCH_PAGINATION = {
  pagination: { current: 1, pageSize: 5 }
};

type Props<T> = {
  state: T;
  columns: ColumnProps<any>[];
  onTableChange: () => void;
  onHandleDelete: () => void;
  onHandleCreate: () => void;
  onHandleUpdate: () => void;
  form: WrappedFormUtils;
};

const MedicinePage = ({ form }: Props<MedicineState>) => {
  const medicineStore = useSelector(
    (state: AppState) => state.medicine,
    shallowEqual
  );
  const drugStore = useSelector((state: AppState) => state.drug, shallowEqual);
  const [targetKeys, setTargetKeys] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { getFieldDecorator } = form;
  let searchInput;

  const formItemLayout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  };

  const getColumnSearchProps = (dataIndex, store = "medicineStore") => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Procurar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            store === "medicineStore"
              ? handleSearch(selectedKeys, confirm, dataIndex)
              : onTableTransferSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() =>
            store === "medicineStore"
              ? handleSearch(selectedKeys, confirm, dataIndex)
              : onTableTransferSearch(selectedKeys, confirm, dataIndex)
          }
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Procurar
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Limpar
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      store === "drugStore" ? (
        drugStore.search.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[drugStore.search.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        )
      ) : medicineStore.search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[medicineStore.search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const columns: ColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      ...getColumnSearchProps("id")
    },
    {
      title: "Nome",
      dataIndex: "nome",
      ...getColumnSearchProps("nome")
    },
    {
      title: "Tipo Medicamento",
      dataIndex: "tipoMedicamento",
      ...getColumnSearchProps("tipoMedicamento")
    },
    {
      title: "Antimicrobiano",
      dataIndex: "antimicrobiano",
      render: antimicrobiano =>
        antimicrobiano ? (
          <span>
            <Tag color="red">SIM</Tag>
          </span>
        ) : (
          <span>
            <Tag color="green">NÃO</Tag>
          </span>
        )
    },
    {
      title: "Bula",
      dataIndex: "bula",
      render: bula =>
        bula ? (
          <span>
            <Button type="link" href={bula} target="_blank">
              Ver bula.
            </Button>
          </span>
        ) : null
    },
    {
      title: "Farmacos",
      dataIndex: "farmacos",
      key: "farmacos",
      render: farmacos =>
        farmacos ? (
          <span>
            {farmacos.map(farmaco => {
              return (
                <Tag color="cyan" key={farmaco.id}>
                  {farmaco.nome.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ) : null
    },
    {
      title: "Ações",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (text, record) => (
        <Popconfirm
          title="Certeza que quer deletar?"
          onConfirm={() => {
            handleDelete(record);
          }}
        >
          <Icon type="delete" />
        </Popconfirm>
      )
    }
  ];

  const drugsTableTransferLeftColumns = [
    {
      dataIndex: "id",
      title: "ID",
      ...getColumnSearchProps("id", "drugStore")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      ...getColumnSearchProps("nome", "drugStore")
    }
  ];

  const drugsTableTransferRightColumns = [
    {
      dataIndex: "id",
      title: "ID",
      key: "rightId",
      ...getColumnSearchProps("id", "drugStore")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      key: "rightNome",
      ...getColumnSearchProps("nome", "drugStore")
    }
  ];

  useEffect(() => {
    if (
      medicineStore.action === MedicineTypes.MEDICINE_DELETE_SUCCESS ||
      medicineStore.action === MedicineTypes.MEDICINE_CREATE_SUCCESS
    ) {
      setModalVisible(false);
      dispatch({
        type: MedicineTypes.MEDICINE_FETCH,
        payload: { ...MEDICINE_FETCH_PAGINATION, search: { searchText: "" } }
      });
    }
  }, [medicineStore.action]);

  useEffect(() => {
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: { ...MEDICINE_FETCH_PAGINATION, search: { searchText: "" } }
    });
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        ...DRUG_FETCH_PAGINATION,
        search: { searchText: "" }
      }
    });
  }, []);

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    } else {
      dispatch({
        type: DrugTypes.DRUG_FETCH,
        payload: {
          ...DRUG_FETCH_PAGINATION,
          search: { searchText: "" }
        }
      });
      setTargetKeys([]);
    }
  }, [isModalVisible]);

  const onChange = (pagination, filters, sorter, extra) => {
    dispatch({
      type: MedicineTypes.MEDICINE_FETCH,
      payload: {
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize
        },
        search: { searchText: "" }
      }
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        ...DRUG_FETCH_PAGINATION,
        search: { searchText: selectedKeys[0], searchedColumn: dataIndex }
      }
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        ...DRUG_FETCH_PAGINATION,
        search: { searchText: "" }
      }
    });
  };

  const handleDelete = (medicine: Medicine) => {
    dispatch({
      type: MedicineTypes.MEDICINE_DELETE,
      payload: {
        selectedRecord: medicine
      }
    });
  };

  const handleCreate = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: MedicineTypes.MEDICINE_CREATE,
          payload: {
            selectedRecord: {
              ...values,
              farmacos: [...targetKeys]
            }
          }
        });
      }
    });
  };

  const handleUpdate = () => {};

  const onFarmaco1Search = val => {
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        ...DRUG_FETCH_PAGINATION,
        search: { searchText: val, searchedColumn: "nome" }
      }
    });
  };

  const onTableTransferSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        ...DRUG_FETCH_PAGINATION,
        search: { searchText: selectedKeys[0], searchedColumn: dataIndex }
      }
    });
  };

  const onTableTransferChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <DataTable
      columns={columns}
      dataSource={medicineStore.data.items}
      onTableChange={onChange}
      onHandleCreate={handleCreate}
      onHandleUpdate={handleUpdate}
      state={medicineStore}
      isModalVisible={isModalVisible}
      onSetModalVisible={setModalVisible}
      rowKey={record => record.id}
      key="Medicine"
      modalWidth="70vw"
    >
      <Form {...formItemLayout} onSubmit={handleCreate}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            placeContent: "space-around"
          }}
        >
          <Form.Item
            label="Uso Interno"
            wrapperCol={{ span: 6 }}
            labelCol={{ span: 18 }}
            style={{ flex: "0 1 auto" }}
          >
            {getFieldDecorator("usoInterno")(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Antimicrobiano"
            wrapperCol={{ span: 6 }}
            labelCol={{ span: 18 }}
            style={{ flex: "0 1 auto" }}
          >
            {getFieldDecorator("antimicrobiano")(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Controle Especial"
            wrapperCol={{ span: 6 }}
            labelCol={{ span: 18 }}
            style={{ flex: "0 1 auto" }}
          >
            {getFieldDecorator("controleEspecial")(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
              />
            )}
          </Form.Item>
          <Form.Item
            label="MIP"
            wrapperCol={{ span: 6 }}
            labelCol={{ span: 18 }}
            style={{ flex: "0 1 auto" }}
          >
            {getFieldDecorator("MIP")(
              <Switch
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
              />
            )}
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <div style={{ flex: "auto" }}>
            <Form.Item label="Nome:">
              {getFieldDecorator("nome", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Fármaco:">
              {getFieldDecorator("farmaco", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Concentração:">
              {getFieldDecorator("concentracao", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Unidade:">
              {getFieldDecorator("unidade", {
                rules: [
                  {
                    min: 1,
                    message: "Campo com no mínimo 1 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Tipo Medicamento:">
              {getFieldDecorator("tipoMedicamento", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Forma Farmaceutica:">
              {getFieldDecorator("formaFarmaceutica", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Via Administração:">
              {getFieldDecorator("viaAdministracao", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </div>
          <div style={{ flex: "auto" }}>
            <Form.Item label="Código ATC:">
              {getFieldDecorator("codigoATC", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Bula (URL):">
              {getFieldDecorator("bula", {
                rules: [
                  {
                    type: "url",
                    message: "Campo deve ser uma url."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Portaria 344:">
              {getFieldDecorator("portaria344", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="TISS:">
              {getFieldDecorator("TISS", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Label:">
              {getFieldDecorator("label", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Unificado:">
              {getFieldDecorator("unificado", {
                rules: [
                  {
                    min: 3,
                    message: "Campo com no mínimo 3 caracteres."
                  },
                  {
                    required: true,
                    message: "Campo obrigatório."
                  }
                ]
              })(<Input />)}
            </Form.Item>
          </div>
        </div>
        <TableTransfer
          dataSource={drugStore.data.items}
          targetKeys={targetKeys}
          showSearch={false}
          onChange={onTableTransferChange}
          leftColumns={drugsTableTransferLeftColumns}
          rightColumns={drugsTableTransferRightColumns}
          rowKey={record => record.id}
        />
      </Form>
    </DataTable>
  );
};

export default withAuthSync(Form.create()(MedicinePage));
