  // 写数据
// const readData = async (deviceId, serviceId, characteristicId, v, bool) => {
//   return new Promise((resolve) => {
//     uni.writeBLECharacteristicValue({
//       deviceId,
//       serviceId,
//       characteristicId,
//       value: v,
//       success: async (res) => {
//         const data = {
//           IotID: DeviceStatus.value.IotID,
//           Title: bool ? "蓝牙开锁" : "蓝牙关锁",
//           Result: "成功",
//         };
//         const ress = await proxy.$api.all({
//           url: "/device/WriteLog",
//           method: "post",
//           data: data,
//         });
//         if (ress.Suc) {
//           readIs.value = true;
//           DeviceStatus.value.LockClutch =
//             DeviceStatus.value.LockClutch == 0 ? 1 : 0;
//           uni.showToast({
//             title: bool ? "蓝牙开锁" : "蓝牙关锁",
//             icon: "success",
//           });
//           resolve();
//         } else {
//           resolve();
//         }
//       },
//     });
//   });
// };
const  fail= (err) => {
  uni.showToast({
    icon: "error",
    title: "查看手机蓝牙是否开启",
  });
},
class Bule { 
  
  // 初始化蓝牙
  initBule(){
    uni.openBluetoothAdapter({
      success: (res) => { 
        console.log("初始化蓝牙成功", res);
        this.getBuleState()
      },
      fail
    })
  }
  // 获取狼牙适配器状态
  getBuleState(){
    uni.getBluetoothAdapterState({
      success: ({ discovering, available }) => {
        if (!available) {
          uni.showToast({
            icon: "error",
            title: "蓝牙适配器不可用",
          });
        }
        if (discovering) { 
          uni.showLoading({ title: "正在搜索蓝牙设备" });
          this.startBule()
        }
      },
      fail
    })
  },
  // 开始搜索蓝牙设备
  startBule(){
    uni.startBluetoothDevicesDiscovery({
      success(res) { 
        getBuleList()
      },
      fail: (err) => {
        uni.hideLoading()
      }
    })
  },
  // 停止搜索
  stopBule(){
    uni.stopBluetoothDevicesDiscovery({
      success: (res) => {
        console.log("停止搜索蓝牙设备成功", res);
      },
      fail: (err) => {
        uni.hideLoading()
      },
      complete: () => {
        uni.hideLoading()
      }
    })
  }
  // 开始寻找新找到的设备
  getBuleList(){
    uni.onBluetoothDeviceFound((res) => {
      console.log(res.devices, "新找到的设备");
      if (res.devices[0].name == "LW-01") {
        // uni.stopBluetoothDevicesDiscovery({
        //   success: (res) => {
        //     uni.hideLoading();
        //     uni.showToast({
        //       title: "搜索到设备",
        //       icon: "success",
        //     });
        //   }
        // })
      }
    })
  }
  // 开始连接蓝牙设备
  connectBule(deviceId){
    uni.createBLEConnection({
      deviceId,
      success:(res)=> { 
        console.log("连接蓝牙设备成功", res);
        this.getBuleService(deviceId)
      },
      fail(err) { 
        uni.showToast({
          icon: "error",
          title: "连接蓝牙设备失败",
        })
      },
      complete:()=> { 
        this.stopBule()
      }
    })
  }
  // 获取蓝牙所有服务
  getBuleService(deviceId){
    uni.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        const serviceId = res.services.filter(
          (item) => item.uuid === "0000FFF0-0000-1000-8000-00805F9B34FB"
        )[0].uuid;

        // getBuleCharacteristics(deviceId, res.services[0].uuid)

      },
      fail: (err) => {
        console.log("获取蓝牙所有服务失败", err);
      }
    })
  },
  // 获取蓝牙设备某个服务所有特征值
  getBuleCharacteristics(deviceId, serviceId){
    uni.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log("获取蓝牙设备某个服务所有特征值成功", res);
      },
      fail: (err) => {
        console.log("获取蓝牙设备某个服务所有特征值失败", err);
      }
    })
  }

}