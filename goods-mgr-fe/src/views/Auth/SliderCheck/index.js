import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    // 成功之后的函数
    successFun: {
      type: Function
    },
    //成功图标
    successIcon: {
      type: String,
      default: '√'
    },
    //成功文字
    successText: {
      type: String,
      default: '验证成功'
    },
    //开始的图标
    startIcon: {
      type: String,
      default: '➜'
    },
    //开始的文字
    startText: {
      type: String,
      default: '请拖住滑块，拖动到最右边'
    },
    //失败之后的函数
    errorFun: {
      type: Function
    },
    //或者用值来进行监听
    status: {
      type: String
    }
  },
  setup(props, context) {
    const disX = ref(0)
    const rangeStatus = ref(false)
    //滑块移动
    const rangeMove = function (e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      let leftBox = document.getElementsByClassName('backbg')[0];
      if (this.rangeStatus) {//不运行
        return false;
      }
      document.onmousemove = (e) => {
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {//减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = '.1s all';
        ele.style.transform = 'translateX(' + this.disX + 'px)';
        e.preventDefault();
      }
      document.onmouseup = () => {
        leftBox.style.width = 0 + 'px'
        leftBox.style.transition = '.5s all';
        if (this.disX !== MaxX) {
          ele.style.transition = '.5s all';
          ele.style.transform = 'translateX(0)';
          //执行成功的函数
          this.errorFun && this.errorFun();
        } else {
          this.rangeStatus = true;
          if (this.status) {
            this.$parent[this.status] = true;
          }
          //执行成功的函数
          this.successFun && this.successFun();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      }
    }

    return {
      disX,
      rangeStatus,
      rangeMove,
    }
  }
})