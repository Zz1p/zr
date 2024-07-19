import Exceljs from 'exceljs';
import { Button, Upload } from 'antd';
import type { UploadProps } from "antd";
import { UploadOutlined } from '@ant-design/icons';

const file2Buffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as ArrayBuffer);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

// 费用计算问题
// 1. 散货，2：集装箱
// 货物的体积不满足一个集装箱的情况下，可以选择散货，散货的费用是按照体积计算的，集装箱的费用是按照集装箱的数量计算的


const FOB = () => {
  const handleFileUpload: UploadProps['beforeUpload'] = async (file) => {
    const buffer = await file2Buffer(file);
    const workbook = new Exceljs.Workbook();
    try {
      await workbook.xlsx.load(buffer);
      handleModifyWorkbook(workbook);
    } catch (error) {
    }
    return false;
  };

  const handleModifyWorkbook = (workbook: Exceljs.Workbook) => {
    const worksheet = workbook.getWorksheet(1);
    console.log(worksheet);
  }


  return <div>
    <Upload beforeUpload={handleFileUpload}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  </div>
}

export default FOB;
