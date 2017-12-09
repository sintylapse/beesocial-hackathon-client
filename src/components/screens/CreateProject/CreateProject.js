import React, { Component } from 'react'

import { Input, Modal, Button, Form, Icon } from 'antd'

const styles = {
    container: {
        margin: '0 auto',
        padding: '20px 0px',
    },
    header: {
        // margin: '0 auto',
        textAlign: 'center',
        marginBottom: 20,
    },
}

class CreateProject extends Component {

    state = {
        createProjectModalVisible: false,
        title: '',
        body: '',
        tags: [],
    }

    createOnChangeHandler = inputType => e => this.setState({
        [inputType]: e.target.value,
    })

    _showModal = () => this.setState({ createProjectModalVisible: true })

    dismissModal = () => this.setState({ createProjectModalVisible: false })

    clearForm = () => {
        this.setState({
            title: '',
            body: '',
            tags: [],
        })
    }

    _createProject = () => {
        this.props.actions.addProject({
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags,
        })
        this.dismissModal()
        this.clearForm()
    }

    render(){
        const { projects } = this.props

        return (
            <div style = {styles.container}>
                <Button type="primary" onClick={this._showModal}>Создать проект <Icon type = "plus" /></Button>
                <div style = {{ marginTop: 20 }}>
                    {
                        projects.length > 0 ?
                            projects.map((project, index) => {
                                return <div key = {index}>
                                    project {index}
                                </div>
                            }) :
                            <div>
                                Пока проектов нет...
                            </div>
                    }
                </div>
                <Modal
                    title = "Создать проект"
                    okText = "Создать"
                    cancelText = "Отмена"
                    style={{ top: 50 }}
                    visible={this.state.createProjectModalVisible}
                    onOk={this._createProject}
                    onCancel={this.dismissModal}
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
                                // value = {this.state.tags}
                                // onChange = {this.createOnChangeHandler('tags')}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default CreateProject
