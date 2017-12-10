import React, { Component } from 'react'

import { Input, Modal, Button, Form, Icon, Tag, Tooltip, List, Spin } from 'antd'

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

function ProjectItems({ data, onClickItem }){
    const onCLickItem = item => {
        onClickItem(item)
    }

    return <List
        itemLayout = "horizontal"
        dataSource = {data}
        renderItem = {
            item => (
                <List.Item>
                    <List.Item.Meta
                        title = {item.title}
                        description = {
                            <div>
                                <div style = {{ marginBottom: 10 }}>
                                    {item.body}
                                </div>
                                {/* {item.tags.map((tag, index) => {
                                    const isLongTag = tag.length > 20
                                    const tagElem = (
                                        <Tag key={tag}>
                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
                                })} */}
                            </div>
                        }
                    />
                    {/* <Tooltip title = {'Опубликовать проект'}>
                        <Button type = "primary" onClick = {() => onCLickItem(item)}>
                            <Icon type = "plus" />
                        </Button>
                    </Tooltip> */}
                </List.Item>
            )
        }
    />
}

class CreateProject extends Component {

    state = {
        createProjectModalVisible: false,
        title: '',
        body: '',
        tags: [],
        tagsInputValue: '',
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
            tagsInputValue: '',
        })
    }

    _createProject = () => {
        this.props.actions.initializeCompetition({
            organization: 'Event Orgatizator',
            amount: 1,
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags,
        })
        this.dismissModal()
        this.clearForm()
    }

    handleTagsChange = e => {
        this.setState({ tagsInputValue: e.target.value });
        if (e.target.value.indexOf(' ') != -1) {
            const state = this.state;
            const tagsInputValue = state.tagsInputValue;
            let tags = state.tags;
            if (tagsInputValue && tags.indexOf(tagsInputValue) === -1) {
                tags = [...tags, tagsInputValue];
            }
            this.setState({
                tags,
                inputVisible: false,
                tagsInputValue: '',
            });
        }
    }

    handleCloseTag = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    }

    _removeCompetition = () => {
        this.props.actions.setCompetition(null)
    }

    render(){
        const { competition, publishedProjects } = this.props

        return (
            <div style = {styles.container}>
                {
                    !competition ?
                        <Button type="primary" onClick={this._showModal}>
                            Создать соревнование <Icon type = "plus" />
                        </Button> :
                        <Button type="danger" onClick={this._removeCompetition}>
                            Отменить <Icon type = "close" />
                        </Button>
                }
                <div style = {{ marginTop: 20 }} >
                    <Button type = "primary" onClick = {() => this.props.actions.emmitPublish()}>
                        Начать соревнование
                    </Button>
                </div>
                {
                    publishedProjects.length > 0 &&
                        <div style = {{ marginTop: 20 }}>
                            <Button type = "secondary" onClick = {() => this.props.actions.distributeGrant()}>
                                Распределиить грант
                            </Button>
                        </div>
                }
                <div style = {{ marginTop: 20 }}>
                    {
                        competition &&
                        <List.Item>
                            <List.Item.Meta
                                title = {competition.title}
                                description = {
                                    <div>
                                        <div style = {{ marginBottom: 10 }}>
                                            {competition.body}
                                        </div>
                                        {competition.tags.map((tag, index) => {
                                            const isLongTag = tag.length > 20
                                            const tagElem = (
                                                <Tag key={tag}>
                                                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                </Tag>
                                            );
                                            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
                                        })}
                                    </div>
                                }
                            />
                        </List.Item>
                    }
                </div>
                <div style = {{ marginTop: 20 }}>
                    <h2>
                        Проекты в соревновании за грант
                    </h2>
                    {
                        !publishedProjects.length > 0 && this.props.loading &&
                            <div style = {{ textAlign: 'center' }}>
                                <Spin size = "large" />
                            </div>
                    }
                    {
                        publishedProjects.length > 0 ?
                            <ProjectItems data = {publishedProjects} /> :
                            <div>
                                {
                                    !this.props.loading && 'Соревнование за грант не началось'
                                }
                            </div>
                    }
                </div>
                <Modal
                    title = "Создать соревнование"
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
                            <Input onChange={this.handleTagsChange} value={this.state.tagsInputValue} />
                            {this.state.tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                    <Tag key={tag} closable afterClose={() => this.handleCloseTag(tag)}>
                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </Tag>
                                );
                                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }

}

export default CreateProject
