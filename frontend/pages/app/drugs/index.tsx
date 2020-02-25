import DataTable from "../../../components/DataTable";
import { ColumnProps } from "antd/lib/table";
import { Popconfirm, Button, Form, Input, Icon } from "antd";
import { useEffect, useState } from "react";
import {
  useSelector,
  useDispatch,
  useStore,
  shallowEqual,
  connect
} from "react-redux";
import Highlighter from "react-highlight-words";
import { WrappedFormUtils } from "antd/lib/form/Form";

import { AppState } from "../../../store/ducks/rootReducer";
import { DrugTypes, Drug, DrugState } from "../../../store/ducks/drug/types";
import { withAuthSync } from "../../../utils/auth";

type Props<T> = {
  state: T;
  columns: ColumnProps<any>[];
  onTableChange: () => void;
  onHandleDelete: () => void;
  onHandleCreate: () => void;
  onHandleUpdate: () => void;
  form: WrappedFormUtils;
};

const Drugs = ({ form }: Props<DrugState>) => {
  let drugs = useSelector((state: AppState) => state.drug, shallowEqual);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { getFieldDecorator } = form;
  let searchInput

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
      drugs.search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[drugs.search.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  useEffect(() => {
    if (
      drugs.action === DrugTypes.DRUG_DELETE_SUCCESS ||
      drugs.action === DrugTypes.DRUG_CREATE_SUCCESS
    ) {
      setModalVisible(false);
      dispatch({
        type: DrugTypes.DRUG_FETCH,
        payload: { pagination: { current: 1, pageSize: 5 }, search: { searchText: "" } }
      });
    }
  }, [drugs.action]);

  useEffect(() => {
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: { pagination: { current: 1, pageSize: 5 }, search: { searchText: "" } }
    });
  }, []);

  useEffect(() => {
    if (!isModalVisible) form.resetFields();
  }, [isModalVisible]);

  const onChange = (pagination, filters, sorter, extra) => {
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize
        },
        search: { searchText: "" }
      }
    });
  };

  const handleDelete = (drug: Drug) => {
    dispatch({
      type: DrugTypes.DRUG_DELETE,
      payload: {
        selectedRecord: drug
      }
    });
  };

  const handleCreate = () => {
    form.validateFieldsAndScroll((err, { nome }) => {
      if (!err) {
        dispatch({
          type: DrugTypes.DRUG_CREATE,
          payload: {
            selectedRecord: { nome }
          }
        });
      }
    });
  };

  const handleUpdate = () => {};

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        pagination: {
          current: 1,
          pageSize: 5
        },
        search: { searchText: selectedKeys[0], searchedColumn: dataIndex }
      }
    });
  };

  const handleReset = clearFilters => {
    clearFilters();
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        pagination: {
          current: 1,
          pageSize: 5
        },
        search: { searchText: "" }
      }
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      ...getColumnSearchProps("id")
    },
    {
      title: "Nome",
      dataIndex: "nome",
      defaultSortOrder: "descend",
      ...getColumnSearchProps("nome")
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

  return (
    <DataTable
      columns={columns}
      dataSource={drugs.data.items}
      onTableChange={onChange}
      onHandleCreate={handleCreate}
      onHandleUpdate={handleUpdate}
      state={drugs}
      isModalVisible={isModalVisible}
      onSetModalVisible={setModalVisible}
      rowKey={record => record.id}
      key="Drugs"
    >
      <Form onSubmit={handleCreate}>
        <Form.Item label="Nome do Fármaco:">
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
      </Form>
    </DataTable>
  );
};

export default withAuthSync(Form.create()(Drugs));
