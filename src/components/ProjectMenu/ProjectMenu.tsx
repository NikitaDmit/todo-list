import * as React from 'react'
import {Layout, Menu} from 'antd'
import {SetStateAction, Dispatch, useEffect} from 'react'
import {RightCircleOutlined, DesktopOutlined} from '@ant-design/icons'
import {useTypedSelector} from '../../common/hooks'
import {useDispatch} from 'react-redux'
import {getProjects} from '../../store/projects/projectsActions'
import {IProject} from '../../models/IProject'
import {setActiveProject} from '../../store/todoProject/todoReducer'
import {useHistory} from 'react-router-dom'
import SmallLoader from '../UI/SmallLoader/SmallLoader'

interface Props {
    collapsed: boolean,
    setCollapsed: Dispatch<SetStateAction<boolean>>
}

export const ProjectMenu: React.FC<Props> = ({collapsed, setCollapsed}: Props) => {
    const {projectList, isLoading} = useTypedSelector(state => state.projects)
    const {activeProject} = useTypedSelector(state => state.todo)
    const dispatch = useDispatch()
    const router = useHistory()

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    const onClickProject = (project: IProject) => {
        dispatch(setActiveProject(project))
    }

    return (
        <Layout.Sider className={'project-menu'} collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <div onClick={() => router.goBack()} className="app-logo">
                <DesktopOutlined/> {!collapsed && 'TodoList'}
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[activeProject?.id || '']}>
                {
                    projectList.map(project =>
                        <Menu.Item
                            icon={<RightCircleOutlined/>}
                            onClick={() => onClickProject(project)}
                            key={project.id}
                        >
                            {project.projectName}
                        </Menu.Item>
                    )
                }
                {isLoading && <Menu.Item><SmallLoader/></Menu.Item>}
            </Menu>
        </Layout.Sider>
    )
}

ProjectMenu.defaultProps = {
    collapsed: false,
    setCollapsed: () => null
}
