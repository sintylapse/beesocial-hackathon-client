import React, { Component } from 'react'

import { Input, Modal, Button, Form } from 'antd'

class CreateProject extends Component {

    state = {
        createProjectModalVisible: false,
        title: '',
        body: '',
        tags: '',
    }

    createOnChangeHandler = inputType => e => this.setState({
        [inputType]: e.target.value,
    })

    _showModal = () => this.setState({ createProjectModalVisible: true })

    _dismissModal = () => this.setState({ createProjectModalVisible: false })

    render(){
        return (
            <div>
                <div>
                    Create Project
                </div>

                <Button type="primary" onClick={this._showModal}>Open</Button>
                <Modal
                    title = "Создать проект"
                    okText = "Создать"
                    cancelText = "Отмена"
                    style={{ top: 50 }}
                    visible={this.state.createProjectModalVisible}
                    onOk={this._dismissModal}
                    onCancel={this._dismissModal}
                >
                    <Form>
                        <Form.Item label = "Название проекта">
                            <Input
                                style = {{ fontWeight: 'bold' }}
                                value = {this.state.title}
                                onChange = {this.createOnChangeHandler('title')}
                            />
                        </Form.Item>
                        <Form.Item label = "Описание проекта">
                            <Input.TextArea
                                autosize = {{ minRows: 6, maxRows: 9 }}
                                value = {this.state.body}
                                onChange = {this.createOnChangeHandler('body')}
                            />
                        </Form.Item>
                        <Form.Item label = "Метки">
                            <Input
                                value = {this.state.tags}
                                onChange = {this.createOnChangeHandler('tags')}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default CreateProject
