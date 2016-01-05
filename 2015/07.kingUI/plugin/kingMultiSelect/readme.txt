data    : type/json   默认demo值  数据源
selectId: type/array  默认为空  默认选中值的id数组集合
selectText   : type/array 默认为空 默认选中值的text数组集合
initAllSelect: type/boolean 默认false 加载是否默认为全选开关,true启用全选
showAllSelectText: type/boolean 默认false 全选时是否展示allSelectText代替全选值开关,true启用显示
allSelectText: type/string  默认'全部'   全选时显示的字段值(对应默认id:all-selected)
disSelectText: type/string  默认'请选择' 全不选显示的字段值(对应默认值:no-selected)
associatting : type/boolean 默认false    联想搜索开关,true启用联想
allselectBefore: type/function 默认为空  全选点击前回调
loadAfter: type/function 默认为空 加载完成函数
itemClick: type/function 默认为空 单击事件回调
whenClose: type/function 默认为空 关闭事件
whenConfirm: type/function 默认为空 确定事件
icon: type/string 默认下拉图标路径 背景图标路径
iconPX: type/string 下拉图片位移x
iconPY: type/string 下拉图片位移y
width: '', //宽度
height: '', //高度
optHeight: '', //操作区高度
memory: true //记忆原操作值