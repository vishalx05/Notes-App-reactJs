import React, { useState } from "react";
import { File, Edit2, Trash2, Plus } from "lucide-react";
import { Modal, Divider, Form, Input, Button,Empty } from "antd";
import { useNote } from "./zustand/userNote";
import { nanoid } from "nanoid";
import moment from "moment";
const App = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { notes, setNote,deleteNote,updateNote } = useNote();
  const [read, setRead] = useState(null);
  const [editId,setEditId]=useState(null)
  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setEditId(null)
  };
  const createNote = (values) => {
    values.id = nanoid();
    values.date = new Date();
    setNote(values);
    handleClose();
  };
  const removeNote=(id)=>{
      deleteNote(id);
      setRead(null)

  }
  const editNote=(item)=>{
      setOpen(true)
      form.setFieldsValue(item)
      setEditId(item.id)
  }
  const saveNote=(values)=>{
    values.date=new Date()
      updateNote(editId,values)
      setRead(values)
      handleClose()

  }
  return (
    <div className="min-h-screen bg-gray-200">
      <aside className="space-y-6 overflow-auto bg-rose-500 fixed top-0 left-0 w-[300px] h-full px-4 py-8">
      {
        notes.length ==0 ? <div></div> :
        <div className="bg-white p-3 rounded-lg space-y-6">
          {notes && notes.map((item, idx) => (
            <button
              onClick={() => setRead(item)}
              key={idx}
              className="flex items-start gap-1 hover:bg-gray-100 w-full hover:rounded-md cursor-pointer hover:p-3 duration-300"
            >
              <File className="w-5 h-5 mt-[5px]" />
              <div className="flex flex-col">
                <label className="font-medium text-black/80 text-left">
                  {item.filename}
                </label>
                <label className="text-gray-500 text-xs text-left">
                  {moment(item.date).format("DD/MM/YYYY, hh:mm A")}
                </label>
              </div>
            </button>
          ))}
        </div>

      }

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1 bg-blue-500 w-full py-3 text-white  rounded-lg font-medium justify-center hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <Plus /> New File
        </button>
      </aside>
      <section className="ml-[300px] py-12">

     {
      read ?
         <div className="w-10/12 mx-auto  bg-white rounded-xl ">
          <div className="px-6 py-4 border-b border-gray-300 border-dashed flex justify-between  items-center">
            <div>
              <h1 className="text-lg font-medium">{read.filename}</h1>
              <label className="text-gray-500 text-xs">
                {moment(read.date).format("DD/MM/YYYY, hh:mm A")}
              </label>
            </div>
            <div className="space-x-3">
              <button onClick={()=>editNote(read)} className="bg-green-500 p-2 rounded-md hover:bg-green-600 hover:scale-105 transition-transform duration-300 cursor-pointer text-white">
                <Edit2 className="w-3 h-3" />
              </button>
              <button onClick={()=>removeNote(read.id)} className="bg-rose-500 p-2 rounded-md hover:bg-rose-600 hover:scale105 transition-transform duration-300 cursor-pointer text-white">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-500">
              {read.content}
            </p>
          </div>
        </div>
        :
        <div className="w-10/12 mx-auto  p-16 bg-white flex items-center justify-center" >
          <Empty description="Choose a file to read" />
        </div>
     }
      </section>
      <Modal
        open={open}
        onCancel={handleClose}
        width={"70%"}
        maskClosable={false}
        footer={null}
      >
        <h1 className="text-xl font-semibold ">Create a new File</h1>
        <Divider />
        <Form
          onFinish={editId ? saveNote : createNote}
          form={form}
          // initialValues={{ content: desc }}
        >
          <Form.Item
            layout="vertical"
            label="Filename"
            name="filename"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter file Name" />
          </Form.Item>
          <Form.Item
            layout="vertical"
            label="Content"
            name="content"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={10}
              size="large"
              placeholder="Enter Content... "
            />
          </Form.Item>
          <Form.Item>
            {
              editId ?   <Button type="primary" danger size="large" htmlType="submit">
              Save
            </Button> :   <Button type="primary" size="large" htmlType="submit">
              Submit
            </Button>
            }

          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
