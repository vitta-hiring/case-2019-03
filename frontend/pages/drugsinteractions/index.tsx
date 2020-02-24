import DataTable from "../../components/DataTable";
import { PaginationConfig, ColumnProps } from "antd/lib/table";
import { Popconfirm, Modal, Button, Form, Input, Select } from "antd";
import { useEffect, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useSelector,
  useDispatch,
  useStore,
  shallowEqual,
  connect
} from "react-redux";

import { AppState } from "../../store/ducks/rootReducer";
import {
  DrugsInteractionsTypes,
  DrugsInteractions,
  DrugsInteractionsState
} from "../../store/ducks/drugsinteractions/types";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { DrugTypes } from "../../store/ducks/drug/types";
const { Option } = Select;

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
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const { getFieldDecorator } = form;

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
      dataIndex: "farmaco1"
    },
    {
      title: "Fármaco 2",
      dataIndex: "farmaco2"
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
          <a>Delete</a>
        </Popconfirm>
      )
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
        payload: { pagination: { current: 1, pageSize: 5 } }
      });
    }
  }, [drugsInteractions.action]);

  useEffect(() => {
    dispatch({
      type: DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH,
      payload: { pagination: { current: 1, pageSize: 5 } }
    });
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        pagination: { current: 1, pageSize: 15 },
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
          pagination: { current: 1, pageSize: 15 },
          search: { searchText: "" }
        }
      });
    }
  }, [isModalVisible]);

  const onChange = (pagination, filters, sorter, extra) => {
    dispatch({
      type: DrugsInteractionsTypes.DRUG_INTERACTIONS_FETCH,
      payload: {
        pagination: {
          current: pagination.current,
          pageSize: pagination.pageSize
        }
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
    form.validateFieldsAndScroll((err, { nome }) => {
      if (!err) {
        dispatch({
          type: DrugsInteractionsTypes.DRUG_INTERACTIONS_CREATE,
          payload: {
            selectedRecord: { nome }
          }
        });
      }
    });
  };

  const handleUpdate = () => {};

  const onFarmaco1Change = value => {
    console.log(`selected ${value}`);
  };

  const onFarmaco1Blur = () => {
    console.log("blur");
  };

  const onFarmaco1Focus = () => {
    console.log("focus");
  };

  const onFarmaco1Search = val => {
    dispatch({
      type: DrugTypes.DRUG_FETCH,
      payload: {
        pagination: { current: 1, pageSize: 15 },
        search: { searchText: val, searchedColumn: "nome" }
      }
    });
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
    >
      <Form onSubmit={handleCreate}>
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
                <Option key={item.id} value={item.nome}>
                  {item.nome}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Farmaco 2:">
          {getFieldDecorator("farmaco2", {
            rules: [
              {
                required: true,
                message: "Campo obrigatório."
              }
            ]
          })(
            <Select
              showSearch
              id="farmaco2"
              style={{ width: 200 }}
              optionFilterProp="children"
              onSearch={onFarmaco1Search}
              // filterOption={(input, option) =>
              //   (option.props.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
            >
              <Option key="" value="">{" "}</Option>
              {drugStore.data.items.map(item => (
                <Option key={item.id} value={item.nome}>
                  {item.nome}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      </Form>
    </DataTable>
  );
};

export default Form.create()(DrugInteractions);
