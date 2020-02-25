import Table, {
  PaginationConfig,
  ColumnProps,
  SorterResult,
  TableCurrentDataSource
} from "antd/lib/table";
import { Modal, Button, Form, Input } from "antd";
import { useEffect } from "react";
import { WrappedFormUtils } from "antd/lib/form/Form";

interface Props {
  columns: ColumnProps<any>[];
  dataSource: any[];
  state: any;
  isModalVisible: boolean;
  onSetModalVisible: (isVisible: boolean) => void;
  rowKey: (record: any, index: number) => string;
  onTableChange: (
    pagination: PaginationConfig,
    filters: Partial<Record<string | number | symbol, string[]>>,
    sorter: SorterResult<any>,
    extra: TableCurrentDataSource<any[]>
  ) => void;
  onHandleCreate: () => void;
  onHandleUpdate: (entity) => void;
  children;
  modalWidth?: string | number;
}

const DataTable = ({
  columns,
  dataSource,
  state,
  isModalVisible,
  onTableChange,
  onHandleCreate,
  onHandleUpdate,
  onSetModalVisible,
  rowKey,
  children,
  modalWidth,
}: Props) => {
  const setModalVisible = isVisible => {
    onSetModalVisible(isVisible);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);

    onTableChange(pagination, filters, sorter, extra);
  };

  const handleCreate = e => {
    e.preventDefault();
    onHandleCreate();
  };

  const record = (record, index): string => {
    return rowKey(record, index);
  };

  useEffect(() => {
    setModalVisible(isModalVisible);
  }, [isModalVisible]);

  return (
    <>
      <Button
        type="primary"
        onClick={() => setModalVisible(true)}
        style={{ margin: "0 0 20px 0" }}
      >
        Criar
      </Button>
      <Modal
        visible={isModalVisible}
        title="Criar um Fármaco"
        onOk={handleCreate}
        width={modalWidth}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={state.loading}
            onClick={handleCreate}
          >
            Criar
          </Button>
        ]}
      >
        {children}
      </Modal>
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey={record}
        pagination={state.pagination}
      />
    </>
  );
};

export default DataTable;
