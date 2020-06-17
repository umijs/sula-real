import React from 'react';
import { Upload, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ImgUpload extends React.Component {
  state = {
    fileList: [],
    previewImage: '',
    visible: false,
  };

  handleChange = async ({ fileList }) => {
    const { onChange } = this.props;
    const fileLength = fileList.length;
    let files = fileList[fileLength - 1];
    if (!files.url && !files.preview) {
      files.url = await getBase64(fileList[fileLength - 1].originFileObj);
    }
    this.setState(state => ({
      fileList: [...state.fileList, files],
    }));
    onChange({ fileList });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.preview,
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { fileList, previewImage, visible } = this.state;
    return (
      <>
        <Upload
          listType="picture-card"
          onChange={this.handleChange}
          beforeUpload={() => false}
          fileList={fileList}
          onPreview={this.handlePreview}
        >
          {fileList.length < 1 && '+ 上传图片'}
        </Upload>
        {visible && (
          <Modal
            visible={true}
            closable
            width={300}
            onCancel={this.handleCancel}
            footer={null}
          >
            <img style={{ width: '100%' }} src={previewImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImgUpload;
