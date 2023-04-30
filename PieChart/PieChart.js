/**
 * 🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇
 * canvas로 Pie Chart를 만들어 반환합니다
 * 🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇🎇
 */
export class PieChartBuilder {
    constructor() {
        this.gradient = [];
        this.dataPie = [];
        this.$canvas = null;
        this.ctx = null;
        this.cx = null;
        this.cy = null;
        this.radius = null;
    }//constructor
    /* ----------------------💛[Builder]---------------------- */
    /**
     * 📍 파이 퍼센트 설정
     * @param {Array} dataPie 퍼센트 정보가 담긴 배열 
     * [ {title : KR, value : Number},...]
     * @returns 
    */
    set_data_pie(dataPie) {
        this.dataPie = dataPie
        return this;
    }//set_data_pie

    /**
     * 📍 그라디언트 색상 팔레트 설정
     * @param {Array} gradient [[color1,color2,color3], [...]]; 
     * @returns 
     */
    set_gradient(gradient) {
        this.gradient = gradient;
        return this;
    }//set_gradient

    /**
     * 파이그래프 그리기 시작
     * @returns {DOM} $wrap
    */
    init() {
        /* wrap */
        this.$wrap = this.make_wrap();

        /* 기본 캔버스 설정 */
        this.$canvas = this.make_canvas();
        this.ctx = this.$canvas.getContext('2d');
        this.$wrap.appendChild(this.$canvas);

        /* 파이 그래프 그리기 */
        this.draw_pie();

        /* 흰 원 및 라벨 추가 */
        this.add_white_circle();
        this.$wrap.appendChild(this.make_label());

        return this.$wrap;
    }//init

    /* ----------------------💛[Func]---------------------- */

    /** 📍 파이 그래프 그리기 */
    draw_pie() {
        const data = this.dataPie.map(obj => obj.value);
        const TOTAL = data.reduce((acc, curr) => acc + curr, 0);

        const SWEEPS = []
        data.forEach(per => {
            SWEEPS.push((per / TOTAL) * Math.PI * 2);
        });

        let accumAngle = -90 * (Math.PI / 180) - SWEEPS[0];
        SWEEPS.forEach((sweep, idx) => {
            this.draw_wedge(accumAngle, accumAngle + sweep, this.gradient[idx], idx);
            accumAngle += sweep;
        });
    }//draw_pie

    /** 📍 draw wedge */
    draw_wedge(startAngle, endAngle, fill, idx) {
        /* draw Arc */
        this.ctx.beginPath();
        this.ctx.moveTo(this.cx, this.cy);
        this.ctx.arc(this.cx, this.cy, this.radius, startAngle, endAngle, false);

        /* fillStyle */
        const bgGrad = this.ctx.createRadialGradient(this.cx, this.cy, this.radius / 2, this.cx, this.cy, this.radius);
        const per = 1 / fill.length;
        let perTotal = 0;
        for (let i = 0; i < fill.length; i++) {
            bgGrad.addColorStop(perTotal, fill[i]);
            perTotal += per;
            if (i == fill.length - 2) perTotal = 1;
        }//for
        this.ctx.fillStyle = bgGrad;

        /* shadow */
        if (idx) {
            this.ctx.shadowColor = fill[2];
            this.ctx.shadowBlur = 10;
            this.ctx.shadowOffsetX = -3;
            this.ctx.shadowOffsetY = 3;
        }

        /* end */
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.shadowColor = 'rgba(0,0,0,0)';
    }//draw_wedge

    /** 중앙에 흰 원 추가 */
    add_white_circle() {
        /* arc */
        this.ctx.beginPath();
        this.ctx.fillStyle = "#ffffff";
        this.ctx.arc(this.cx, this.cy, this.radius / 1.85, 0, 2 * Math.PI, false)

        /* shadow */
        this.ctx.shadowColor = '#1c2541';
        this.ctx.shadowBlur = this.radius / 6;
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;

        /* end */
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.shadowColor = 'rgba(0,0,0,0)';
    }//add_white_circle

    /* ----------------------💛[Dom Maker]---------------------- */

    /** 
     * 📍 make wrap 
     * @returns {DOM} wrap
    */
    make_wrap() {
        const $wrap = document.createElement('DIV');
        $wrap.style.display = 'flex';
        $wrap.style.flexFlow = 'column nowrap';
        $wrap.style.justifyContent = 'center';
        $wrap.style.alignItems = 'center';
        $wrap.style.position = 'relative';
        return $wrap;
    }//make_wrap

    /**
     * 캔버스 만들어 반환
     * @returns {DOM} canvas
     */
    make_canvas() {
        const wid = 900;
        const $canvas = document.createElement('CANVAS');
        $canvas.width = wid;
        $canvas.height = wid;
        $canvas.style.width = '100%';
        $canvas.style.aspectRatio = '1/1';

        this.cx = wid / 2;
        this.cy = this.cx;
        this.radius = wid / 3;

        return $canvas;
    }//make_canvas

    /**
     * 📍
     * 라벨 만들어 추가
     * @returns {DOM}
     */
    make_label(){
        const $labelWrap = document.createElement('SECTION');
        $labelWrap.style.display = 'flex';
        $labelWrap.style.flexFlow = 'column nowrap';
        $labelWrap.style.justifyContent = 'center';
        $labelWrap.style.alignItems = 'flex-start';
        $labelWrap.style.gap = '10px';
        $labelWrap.style.position = 'absolute';
        this.dataPie.forEach((item,idx)=>{
            const {title,value} = item;
            const $row = document.createElement('DIV');
            const $lbl = document.createElement('P');
            const $title = document.createElement('SPAN');
            const $value = document.createElement('SPAN');

            $row.style.display = 'flex';
            $row.style.alignItems = 'center';
            $row.style.position = 'relative';
            $row.style.gap = '5px';

            $lbl.style.height = "1.5em";
            $lbl.style.aspectRatio = '1/1';
            $lbl.style.background = `conic-gradient(${this.gradient[idx].join(',')})`;
            $lbl.style.borderRadius = '50%';
            
            $title.style.fontWeight = '600';
            $title.style.fontSize = "13px";
            
            $title.textContent = title;
            $value.textContent = `${value}%`;

            $row.appendChild($lbl);
            $row.appendChild($title);
            $row.appendChild($value);
            $labelWrap.appendChild($row);
        });
        return $labelWrap;
    }//make_label
}//class-PieChart