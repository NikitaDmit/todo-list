import * as React from 'react'
import {Row, Col, Layout} from 'antd'
import {useTypedSelector} from '../../common/hooks'
import {CreateProject} from '../../components/CreateProject/CreateProject'
import {Project} from '../../components/Project/Project'
import './ProjectsController.scss'
import {useContext} from 'react'
import {Context} from '../../appContext'
import classNames from 'classnames'

interface Props {
}

export const ProjectsController: React.FC = (props: Props) => {
    const {activeProject} = useTypedSelector(state => state.todo)
    const {collapsed} = useContext(Context)
    const classes = classNames('projects-controller__content',{
        'projects-controller__hide': !collapsed
    })

    return (
        <div className={'projects-controller'}>
            <Layout.Content>
                <Row>
                    <Col xs={0} sm={4} md={6}/>
                    <Col className={classes} xs={24} sm={16} md={12}>
                        {activeProject ? <Project/> : <CreateProject/>}
                    </Col>
                    <Col xs={0} sm={4} md={6}/>
                </Row>
            </Layout.Content>
        </div>
    )
}

ProjectsController.defaultProps = {}
