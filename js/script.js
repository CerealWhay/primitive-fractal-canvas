const app = Vue.createApp({

    data() {
        return {
            canvas: null,
            ctx: null,

            baseSize: 200,
            startPoint: {
                x: 600,
                y: 800,
            },
            i: 1,

            currentPoint: null,
            ends: []
        }
    },
    computed: {
        currentSize() {
            return this.baseSize / 2 ** (this.i-1)
        }
    },
    mounted() {
        this.initCanvas()
        this.currentPoint = this.startPoint;
        this.ends.push({x: this.currentPoint.x, y: this.currentPoint.y - this.currentSize});
    },
    methods: {
        initCanvas() {
            this.canvas = this.$refs.canvas
            this.canvas.width = 1200
            this.canvas.height = 800
            this.ctx = this.canvas.getContext('2d')
        },
        frame() {
            this.drawElement()
            this.i++
        },
        drawElement() {
            const currentEnds = []
            this.ends.forEach((end) => {
                const begin = end
                const end1 = {
                    x: end.x + this.currentSize,
                    y: end.y - this.currentSize,
                }
                const end2 = {
                    x: end.x - this.currentSize,
                    y: end.y - this.currentSize,
                }
                this.drawLine(begin, end1)
                this.drawLine(begin, end2)

                currentEnds.push(end1)
                currentEnds.push(end2)
            })
            this.ends = currentEnds
        },
        drawLine(begin, end) {
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
            this.ctx.beginPath();
            this.ctx.moveTo(begin.x, begin.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    },

    // language=Vue
    template: `
      <div>
      <canvas ref="canvas" @click="frame"></canvas>
      </div>`
})

app.mount('#app')