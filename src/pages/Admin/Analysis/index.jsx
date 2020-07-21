import React, { Component } from 'react'
import { Row, Col, Statistic, Progress } from 'antd'

import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import { AreaChart, ColumnChart } from 'bizcharts'

//引入card组件
import Card from '@comps/Card'
const firstRowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示col在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 数据源 面积图数据
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 5 },
  { year: '1999', value: 6 }
]


// 数据源 柱状图数据
const columnsData = [
  {
    type: '家具家电',
    sales: 38
  },
  {
    type: '粮油副食',
    sales: 52
  },
  {
    type: '生鲜水果',
    sales: 61
  },
  {
    type: '美容洗护',
    sales: 145
  },
  {
    type: '母婴用品',
    sales: 48
  },
  {
    type: '进口食品',
    sales: 38
  },
  {
    type: '食品饮料',
    sales: 38
  },
  {
    type: '家庭清洁',
    sales: 38
  }
]

export default class Analys extends Component {
  render () {
    return (
      <div>
        <Row gutter={16, 16}>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              {/* card的内容,写在子节点的位置 */}
              <span>
                周同比 12% <CaretUpOutlined style={{ color: 'red' }} />
              </span>
              <span style={{ marginLeft: 10 }}>
                日同比 10% <CaretDownOutlined style={{ color: 'green' }} />
              </span>
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              title={
                <Statistic title='总销售额' value={112893} prefix={'￥'} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <AreaChart
                data={data}
                xField='year'
                yField='value'
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                smooth={true}
                padding='0'
                forceFit={true}
                color={['#2a8']}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='支付笔数' value={13145} />
              }
              footer={<span>转化率 60%</span>}
            >
              <ColumnChart
                data={columnsData}
                // title={{
                //   visible: true,
                //   text: '基础柱状图'
                // }}
                xAxis={{
                  visible: false
                }}
                yAxis={{
                  visible: false
                }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                // 给图表数据源起别名
                meta={{
                  type: {
                    alias: '类别'
                  },
                  sales: {
                    alias: '销售额(万)'
                  }
                }}
              />
            </Card>
          </Col>
          <Col {...firstRowCol}>
            <Card
              // Card标题
              title={
                <Statistic title='运营结果' value={112893} />
              }
              footer={<span>日销售额 ￥12,423</span>}
            >
              <Progress
                percent={80.9} // 进度值
                strokeColor={{
                  //渐变颜色
                  from: '#108ee9',
                  to: '#87d068'
                }}
                status='active' //闪烁效果
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
