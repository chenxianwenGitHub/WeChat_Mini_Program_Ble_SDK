// pages/readDailyData/index.js

import { veepooBle, veepooFeature } from '../../miniprogram_dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = {
      status: true
    }
    veepooBle.veepooWeiXinSDKRawDataShowStatus(data)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.notifyMonitorValueChange();
  },
  readData(e: any) {
    let index = e.currentTarget.dataset.index
    let data = {
      day: index, // 0 今天  1 昨天 2 前天
      package: 1
    }
    veepooFeature.veepooSendReadDailyDataManager(data);
  },
  notifyMonitorValueChange() {
    let self = this;
    veepooBle.veepooWeiXinSDKNotifyMonitorValueChange(function (e: any) {
      console.log("日常数据 监听蓝牙回调=>", e);
      // 睡眠数据
      if (e && e.type == 5) {
        self.setData({
          device: e
        })
        console.log("日常数据====》", e.content.reverse())
        if (e && e.type == 5 && e.Progress == 100) {
          let content = e.content.reverse();
          let arr: any = []
          let rr50Array: number[] = [];
          content.forEach((item: any) => {
            let obj = item.bloodPressure
            let date = item.date.split("-");
            // 获取7小时rr50值
            if (Number(date[3]) < 7) {
              console.log("item.rr50=>", item.rr50)
              rr50Array.push(...item.rr50)
            }
            arr.push(obj)
          });

          console.log("rr50Array==》", rr50Array)
          let drawArr = veepooFeature.veepooGetLorentzScatterPlotData(rr50Array);
          console.log("洛伦兹散点图==>", drawArr)
          let starIndexs = veepooFeature.veepooGetLorentzScatterPlotStarIndex(rr50Array);
          console.log("洛伦兹星级starIndexs==>", starIndexs);
          console.log("arr=>", arr)
          let similarity = veepooFeature.VeepooGetLorentzScatterPlotSimilarity(rr50Array);
          console.log("洛伦兹相似度similarity=>", similarity)

        }
      }
    })
  },
})