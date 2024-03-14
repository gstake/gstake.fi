import {memo} from 'react'
import Table from 'rc-table'
import Pagination from 'rc-pagination'
import styled from 'styled-components'
import {useTranslation} from 'next-i18next'

import Loading from 'components/common/Loading'
// import {useAuth} from 'utils/auth-context'
import useAuth from 'utils/ironSessionLib/useIronUser'

interface ColumnsProps {
    title?: string | JSX.Element
    dataIndex?: string
    key?: string
    width?: number
    align?: 'left' | 'center' | 'right'
    render?: (type: any, record: any) => JSX.Element
    fixed?: 'left' | 'right' | boolean
    expandable?: ExpandableProps
}

interface PaginationProps {
    size?: 'large' | 'small'
    pageSize?: number
    total?: number
    current?: number
}

export interface ExpandableProps {
    defaultExpandAllRows?: boolean // false?: Expand All Rows initially
    defaultExpandedRowKeys?: string[] // []	initial expanded rows keys
    expandedRowKeys?: string[] | number[] // current expanded rows keys
    expandedRowRender?: (record, index, indent, expanded) => React.ReactNode //	Content render to expanded row
    expandedRowClassName?: (record, index, indent) => string // get expanded row's className
    expandRowByClick?: boolean // Support expand by click row
    expandIconColumnIndex?: number // 0	The index of expandIcon which column will be inserted when expandIconAsCell is false
    expandIcon?: (props) => React.ReactNode // Customize expand icon
    indentSize?: number //	15	indentSize for every level of data.i.children, better using with column.width specified
    rowExpandable?: (record) => boolean //	Config row support expandable
    onExpand?: (expanded, record) => void //	function to call when click expand icon
    onExpandedRowsChange?: (expandedRows) => void //	function to call when the expanded rows change
    fixed?: boolean
}

interface CustomColumnProps {
    columns: ColumnsProps[]
    dataSource: any
    className?: string
    pagination?: boolean | PaginationProps
    loading?: boolean
    onChange?: (newPage: number) => void
    theme?: string
    hasLoading?: boolean
    headerStyle?: {
        height?: string
    }
    expandable?: ExpandableProps
    rowKey?: string
    headerCellStyle?: {
        fontSize?: string
        lineHeight?: string
        color?: string
        borderBottom?: string
        background?: string
    }
    rowStyle?: {
        height?: string
    }
    rowCellStyle?: {
        fontSize?: string
        lineHeight?: string
        color?: string
        borderBottom?: string
    }
    defaultHeight?: number
    needLogined?: boolean
    emptyTitle?: string
}

interface EmptyTextProps {
    height?: number
}

export default memo(
    ({
        columns,
        loading = false,
        dataSource,
        className,
        pagination,
        onChange,
        headerStyle,
        headerCellStyle,
        rowStyle,
        rowCellStyle,
        defaultHeight,
        needLogined,
        theme = 'light',
        hasLoading = true,
        expandable = {},
        emptyTitle = '',
    }: CustomColumnProps) => {
        const {userToken} = useAuth()
        const {t} = useTranslation('common')

        return (
            <Wrapper>
                {hasLoading && loading && <Loading theme={theme} hasBac={true} />}
                <TableWrapper
                    needLogined={needLogined}
                    headerStyle={headerStyle}
                    headerCellStyle={headerCellStyle}
                    rowStyle={rowStyle}
                    rowCellStyle={rowCellStyle}
                    className={className}
                    columns={columns}
                    data={needLogined && !userToken ? [] : dataSource}
                    emptyText={
                        <EmptyText height={defaultHeight}>
                            {/* <Image width="50" height="50" src={'/static/img/no-record.png'} alt="loading..." /> */}
                            <img
                                src={require('../../public/static/img/no-record.png')}
                                alt="loading..."
                                width={50}
                                height={50}
                            />
                            <span>{emptyTitle || t('commonNoRecord')}</span>
                        </EmptyText>
                    }
                    expandable={expandable}
                />

                {pagination ? (
                    <PaginationWrap
                        theme={theme}
                        prevIcon={
                            <PagiNavItem theme={theme} className="rc-pagination-item-link">
                                <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="left"
                                    width="12px"
                                    height="12px"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
                                </svg>
                            </PagiNavItem>
                        }
                        nextIcon={
                            <PagiNavItem theme={theme} className="rc-pagination-item-link">
                                <svg
                                    viewBox="64 64 896 896"
                                    focusable="false"
                                    data-icon="right"
                                    width="12px"
                                    height="12px"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
                                </svg>
                            </PagiNavItem>
                        }
                        {...pagination}
                        onChange={onChange}
                    />
                ) : null}
            </Wrapper>
        )
    }
)

const Wrapper = styled.div`
    width: 100%;
    position: relative;

    .rc-pagination {
        margin: 0;
        padding: 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-top: 20px;

        ul,
        ol {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        &::after {
            display: block;
            clear: both;
            height: 0;
            overflow: hidden;
            visibility: hidden;
            content: ' ';
        }

        &-total-text {
            display: inline-block;
            height: 28px;
            margin-right: 8px;
            line-height: 28px - 2px;
            vertical-align: middle;
        }

        &-item {
            display: inline-block;
            /* min-width: 18px; */
            height: 28px;
            margin-right: 8px;
            font-family: Arial;
            line-height: 28px - 2px;
            text-align: center;
            vertical-align: middle;
            list-style: none;
            background-color: #fff;
            /* border: 1px solid #d9d9d9; */
            border-radius: 2px;
            outline: 0;
            cursor: pointer;
            user-select: none;
            position: relative;

            a {
                display: block;
                padding: 0 6px;
                color: rgba(0, 0, 0, 0.85);
                transition: none;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    text-decoration: none;
                }
            }

            &:focus,
            &:hover {
                border-color: #1890ff;
                transition: all 0.3s;
                a {
                    color: #1890ff;
                }
            }

            &-active {
                font-weight: 500;
                background: #fff;
                border-color: #000;

                a {
                    color: #40a9ff;
                }

                &:focus,
                &:hover {
                    border-color: #40a9ff;
                }

                &:focus a,
                &:hover a {
                    color: #40a9ff;
                }
            }
        }

        &-jump-prev,
        &-jump-next {
            outline: 0;

            button {
                background: transparent;
                border: none;
                cursor: pointer;
                color: #666;
            }

            button:after {
                display: block;
                content: '•••';
            }
        }

        &-prev,
        &-jump-prev,
        &-jump-next {
            margin-right: 8px;
        }
        &-prev,
        &-next,
        &-jump-prev,
        &-jump-next {
            display: inline-block;
            min-width: 28px;
            height: 28px;
            color: rgba(0, 0, 0, 0.85);
            font-family: Arial;
            line-height: 28px;
            text-align: center;
            vertical-align: middle;
            list-style: none;
            border-radius: 2px;
            cursor: pointer;
            transition: all 0.3s;
        }

        &-prev,
        &-next {
            outline: 0;

            button {
                color: rgba(0, 0, 0, 0.85);
                cursor: pointer;
                user-select: none;
            }

            &:hover button {
                border-color: #40a9ff;
            }

            .rc-pagination-item-link {
                display: block;
                width: 100%;
                height: 100%;
                font-size: 12px;
                text-align: center;
                background-color: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                outline: none;
                transition: all 0.3s;
            }

            &:focus .rc-pagination-item-link,
            &:hover .rc-pagination-item-link {
                color: #1890ff;
                border-color: #1890ff;
            }
        }

        &-prev button:after {
            content: '‹';
            display: block;
        }

        &-next button:after {
            content: '›';
            display: block;
        }

        &-disabled {
            &,
            &:hover,
            &:focus {
                cursor: not-allowed;
                .rc-pagination-item-link {
                    color: fade(#000, 25%);
                    border-color: #d9d9d9;
                    cursor: not-allowed !important;

                    /* svg {
                        fill: #d9d9d9 !important;
                    } */
                }
            }
        }

        &-slash {
            margin: 0 10px 0 5px;
        }

        &-options {
            display: inline-block;
            margin-left: 16px;
            vertical-align: middle;

            @media all and (-ms-high-contrast: none) {
                *::-ms-backdrop,
                & {
                    vertical-align: top;
                }
            }

            &-size-changer.rc-select {
                display: inline-block;
                width: auto;
                margin-right: 8px;
            }

            &-quick-jumper {
                display: inline-block;
                height: 28px;
                line-height: 28px;
                vertical-align: top;

                input {
                    width: 50px;
                    margin: 0 8px;
                }
            }
        }

        &-simple &-prev,
        &-simple &-next {
            height: 24px;
            line-height: 24px;
            vertical-align: top;
            .rc-pagination-item-link {
                height: 24px;
                background-color: transparent;
                border: 0;
                &::after {
                    height: 24px;
                    line-height: 24px;
                }
            }
        }

        &-simple &-simple-pager {
            display: inline-block;
            height: 24px;
            margin-right: 8px;

            input {
                box-sizing: border-box;
                height: 100%;
                margin-right: 8px;
                padding: 0 6px;
                text-align: center;
                background-color: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 2px;
                outline: none;
                transition: border-color 0.3s;

                &:hover {
                    border-color: #1890ff;
                }
            }
        }

        // ============================ Disabled ============================
        &&-disabled {
            cursor: not-allowed;

            .rc-pagination-item {
                background: hsv(0, 0, 96%);
                border-color: #d9d9d9;
                cursor: not-allowed;

                a {
                    color: fade(#000, 25%);
                    background: transparent;
                    border: none;
                    cursor: not-allowed;
                }

                &-active {
                    background: darken(hsv(0, 0, 96%), 10%);
                    border-color: transparent;
                    a {
                        color: #fff;
                    }
                }
            }

            .rc-pagination-item-link {
                color: fade(#000, 25%);
                background: hsv(0, 0, 96%);
                border-color: #d9d9d9;
                cursor: not-allowed;
            }

            .rc-pagination-item-link-icon {
                opacity: 0;
            }

            .rc-pagination-item-ellipsis {
                opacity: 1;
            }
        }
    }

    @media only screen and (max-width: 992px) {
        .rc-pagination-item {
            &-after-jump-prev,
            &-before-jump-next {
                display: none;
            }
        }
    }

    @media only screen and (max-width: 576px) {
        .rc-pagination-options {
            display: none;
        }
    }
`
const TableWrapper = styled(Table)<
    Pick<CustomColumnProps, 'headerStyle' | 'headerCellStyle' | 'rowStyle' | 'rowCellStyle' | 'needLogined'>
>`
    width: 100%;

    table {
        width: 100%;
        border-spacing: 0;
    }
    .rc-table-thead {
        height: ${(props) => props?.headerStyle?.height || '50px'};

        .rc-table-cell {
            font-size: ${(props) => props?.headerCellStyle?.fontSize || '12px'};
            line-height: ${(props) => props?.headerCellStyle?.lineHeight || '12px'};
            color: ${(props) => props?.headerCellStyle?.color || '#b3b7c0'};
            font-weight: normal;
            border-bottom: ${(props) => props?.headerCellStyle?.borderBottom || 'solid 1px #f0f0f0'};
            height: ${(props) => props?.headerStyle?.height || '50px'};
            background: ${(props) => props?.headerCellStyle?.background || 'none'};

            &:first-child {
                padding-left: 20px;
            }
        }
    }

    .rc-table-row {
        height: 52px;
        height: ${(props) => props?.rowStyle?.height || '52px'};

        .rc-table-cell {
            font-weight: normal;
            font-size: ${(props) => props?.rowCellStyle?.fontSize || '12px'};
            color: ${(props) => props?.rowCellStyle?.color || 'inherit'};
            line-height: ${(props) => props?.rowCellStyle?.lineHeight || '12px'};
            font-weight: normal;
            border-bottom: ${(props) => props?.rowCellStyle?.borderBottom || 'solid 1px #f0f0f0'};

            &:first-child {
                padding-left: 16px;
            }
        }
    }
`

const PaginationWrap = styled(Pagination)`
    .rc-pagination-item-link {
        background-color: ${(props) => (props.theme === 'dark' ? '#242531' : '#fff')} !important;
        border-color: ${(props) => (props.theme === 'dark' ? '#676f81' : '#d9d9d9')} !important;

        svg {
            fill: ${(props) => (props.theme === 'dark' ? '#676f81' : '#d9d9d9')} !important;
            transition: all 0.5s;
        }

        &:hover {
            border-color: ${(props) => (props.theme === 'dark' ? '#d9d9d9' : '#1890ff')} !important;
            svg {
                fill: ${(props) => (props.theme === 'dark' ? '#d9d9d9' : '#1890ff')} !important;
            }
        }
        /* svg {
            fill: ${(props) => (props.theme === 'dark' ? '#676f81' : '#fff')} !important;
        }

        &:hover {
            svg {
                fill: ${(props) => (props.theme === 'dark' ? '#d9d9d9' : '#1890ff')} !important;
            }
        } */
    }
    .rc-pagination-disabled .rc-pagination-item-link,
    .rc-pagination-disabled:hover .rc-pagination-item-link,
    .rc-pagination-disabled:focus .rc-pagination-item-link {
        border-color: ${(props) => (props.theme === 'dark' ? '#676f81' : '#d9d9d9')} !important;
    }
    .rc-pagination-disabled .rc-pagination-item-link svg,
    .rc-pagination-disabled:hover .rc-pagination-item-link svg,
    .rc-pagination-disabled:focus .rc-pagination-item-link svg {
        fill: ${(props) => (props.theme === 'dark' ? '#676f81' : '#d9d9d9')} !important;
    }

    .rc-pagination-item-active,
    .rc-pagination-item {
        background: ${(props) => (props.theme === 'dark' ? '#242531' : '#fff')} !important;
    }
    .rc-pagination-item a {
        color: ${(props) => (props.theme === 'dark' ? '#676f81' : 'rgba(0,0,0,0.85)')} !important;
    }
    .rc-pagination-item-active a {
        color: ${(props) => (props.theme === 'dark' ? '#fff' : '#1665e3')} !important;
    }
`

const EmptyText = styled.div<EmptyTextProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: ${(props) => props.height || 300}px;
    img {
        width: 87px;
        height: 87px;
    }
    span {
        color: #aeb8bd;
        font-size: 12px;
    }
`

const PagiNavItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: solid 1px #e6e7e8;
    border-radius: 2px;
    padding-top: 2px;

    /* &.rc-pagination-item-link {
        background-color: ${(props) => (props.theme === 'dark' ? 'none' : '#fff')} !important;
    } */
    /* 
    svg {
        fill: #d9d9d9;
    }

    &:hover {
        border-color: #1890ff;
        svg {
            fill: #1890ff;
        }
    } */
`
