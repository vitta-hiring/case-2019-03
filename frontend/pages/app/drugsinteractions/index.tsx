import DataTable from "../../../components/DataTable";
import { PaginationConfig, ColumnProps } from "antd/lib/table";
import { Popconfirm, Modal, Button, Form, Input, Select, Icon } from "antd";
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
  DrugsInteractionsTypes,
  DrugsInteractions,
  DrugsInteractionsState
} from "../../../store/ducks/drugsinteractions/types";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { DrugTypes } from "../../../store/ducks/drug/types";
import TableTransfer from "../../../components/TableTransfer";
import { withAuthSync } from "../../../utils/auth";

const { Option } = Select;

const DRUG_FETCH_PAGINATION = {
  pagination: { current: 1, pageSize: 15 }
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

const DrugInteractions = ({ form }: Props<DrugsInteractionsState>) => {
  const drugsInteractions = useSelector(
    (state: AppState) => state.drugsinteractions,
    shallowEqual
  );
  const drugStore = useSelector((state: AppState) => state.drug, shallowEqual);
  const [targetKeys, setTargetKeys] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { getFieldDecorator } = form;
  let searchInput;

  const columns: ColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Nome",
      dataIndex: "nome"
    },
    {
      title: "Descrição",
      dataIndex: "descricao"
    },
    {
      title: "Fármaco 1",
      dataIndex: "farmaco1.nome"
    },
    {
      title: "Fármaco 2",
      dataIndex: "farmaco2.nome"
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

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const getColumnSearchProps = dataIndex => ({
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
  });

  const drugsTableTransferLeftColumns = [
    {
      dataIndex: "id",
      title: "ID",
      ...getColumnSearchProps("id")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      ...getColumnSearchProps("nome")
    }
  ];

  const drugsTableTransferRightColumns = [
    {
      dataIndex: "id",
      title: "ID",
      key: "rightId",
      ...getColumnSearchProps("id")
    },
    {
      dataIndex: "nome",
      title: "Nome",
      key: "rightNome",
      ...getColumnSearchProps("nome")
    }
  ];

  useEffect(() => {
    if (
      drugsInteractions.action ===
        DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE_SUCCESS ||
      drugsInteractions.action ===
        DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE_SUCCESS
    ) {
      setModalVisible(false);
      dispatch({
        type: DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH,
        payload: {
          pagination: { current: 1, pageSize: 5 },
          search: { searchText: "" }
        }
      });
    }
  }, [drugsInteractions.action]);

  useEffect(() => {
    dispatch({
      type: DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH,
      payload: {
        pagination: { current: 1, pageSize: 5 },
        search: { searchText: "" }
      }
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
      type: DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH,
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

  const handleDelete = (drug: DrugsInteractions) => {
    dispatch({
      type: DrugsInteractionsTypes.DRUG_INTERACTIONS_DELETE,
      payload: {
        selectedRecord: drug
      }
    });
  };

  const handleCreate = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE,
          payload: {
            selectedRecord: {
              ...values,
              farmaco2: [...targetKeys]
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

  const onTableTransferSearch = (dir, val) => {
    if (dir === "left") {
      dispatch({
        type: DrugTypes.DRUG_FETCH,
        payload: {
          ...DRUG_FETCH_PAGINATION,
          search: { searchText: val, searchedColumn: "nome" }
        }
      });
    }
  };

  const onTableTransferChange = nextTargetKeys => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <DataTable
      columns={columns}
      dataSource={drugsInteractions.data.items}
      onTableChange={onChange}
      onHandleCreate={handleCreate}
      onHandleUpdate={handleUpdate}
      state={drugsInteractions}
      isModalVisible={isModalVisible}
      onSetModalVisible={setModalVisible}
      rowKey={record => record.id}
      key="DrugsInteractions"
      modalWidth="60vw"
    >
      <Form {...formItemLayout} onSubmit={handleCreate}>
        <Form.Item label="Gravidade Interação:">
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
        <Form.Item label="Descrição Interação:">
          {getFieldDecorator("descricao", {
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
        <Form.Item label="Farmaco 1:">
          {getFieldDecorator("farmaco1", {
            rules: [
              {
                required: true,
                message: "Campo obrigatório."
              }
            ]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              optionFilterProp="children"
              onSearch={onFarmaco1Search}
              // filterOption={(input, option) =>
              //   (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
            >
              {drugStore.data.items.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.nome}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <TableTransfer
          dataSource={drugStore.data.items.filter(
            item => item.id != form.getFieldsValue().farmaco1
          )}
          targetKeys={targetKeys}
          showSearch={false}
          disabled={form.getFieldsValue().farmaco1 ? false : true}
          onChange={onTableTransferChange}
          onSearch={onTableTransferSearch}

          leftColumns={drugsTableTransferLeftColumns}
          rightColumns={drugsTableTransferRightColumns}
          rowKey={record => record.id}
        />
      </Form>
    </DataTable>
  );
};

export default withAuthSync(Form.create()(DrugInteractions));
