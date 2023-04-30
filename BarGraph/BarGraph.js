/**
 * ✨✨✨✨✨✨✨✨
 * 막대그래프 생성관련 Dom Maker
 * ✨✨✨✨✨✨✨✨
 */
export class BarGraphDomMaker{
    /**
     * wrap을 만들고 스타일 지정
     * @returns {DOM} $wrap
     */
    make_wrap(){
        const $wrap = document.createElement('DIV');
        $wrap.style.display = "flex";
        $wrap.style.flexFlow = "row nowrap";
        $wrap.style.position = "relative";
        $wrap.style.width = `${this.wrapWidth}px`;
        $wrap.style.height = `${this.wrapHeight}`;

        $wrap.style.border = "1px solid black";
        return $wrap;
    }//make_wrap

    /**
     * 라벨을 만들고 스타일 지정
     * @returns {DOM} $wrapLabel
     */
    make_label(){
        const $wrapLabel = document.createElement('SECTION');
        $wrapLabel.style.display = 'flex';
        $wrapLabel.style.flexFlow = 'column nowrap';
        $wrapLabel.style.justifyContent = 'center';
        $wrapLabel.style.alignItems = 'flex-start';
        $wrapLabel.style.gap = '10px';
        $wrapLabel.style.position = 'relative';
        $wrapLabel.style.width = `${this.labelWidth}px`;
        $wrapLabel.style.height = `${this.wrapHeight}px`;
        $wrapLabel.style.padding = "14px";
        $wrapLabel.style.fontSize = "12px";
        $wrapLabel.style.fontWeight = "600";
        $wrapLabel.style.background = "eee";
        $wrapLabel.style.borderRight = "1px solid black";

        if(!this.dataBar.length || !this.dataBar[0].list) return $wrapLabel;

        const {list} = this.dataBar[0];

        list.forEach((item,idx)=>{
            const {title} = item;
            const $lbl = document.createElement('ARTICLE');
            const $lblColor = document.createElement('DIV');
            const $lblText = document.createElement('DIV');
            /* 내용 */
            $lblText.textContent = title; 
            /* 스타일 */
            $lbl.style.display = 'flex';
            $lbl.style.flexFlow = 'row nowrap';
            $lbl.style.alignItems = 'center';
            $lbl.style.gap = "5px";

            $lblColor.style.height = "1.25em";
            $lblColor.style.aspectRatio = "1.5/1";
            $lblColor.style.border = "1px solid black";
            $lblColor.style.background = `linear-gradient(to right, ${this.gradient[idx].join(',')})`
            /* 최종 */
            $lbl.appendChild($lblColor); 
            $lbl.appendChild($lblText); 
            $wrapLabel.appendChild($lbl);
        });

        /* 최종 */
        return $wrapLabel;
    }//make_label

    /**
     * 캔버스 만들고 스타일 지정
     * @returns {DOM} $canvas
     */
    make_canvas(){
        const $canvas = document.createElement('CANVAS');
        $canvas.width = this.canvasWidth * 2;
        $canvas.height = this.wrapHeight * 2;
        $canvas.style.width = `${this.canvasWidth}px`;
        $canvas.style.height = `${this.wrapHeight}px`;
        return $canvas;
    }//make_canvas
}//BarGraphDomMaker


/**
 * ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
 * 막대그래프 생성 클래스
 * - 열 하나당 n개의 막대그래프가 들어갑니다.
 * ✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨
 */
export class BarGraphBuilder extends BarGraphDomMaker{
    constructor(){
        super();
        this.wrapWidth = 560;
        this.wrapHeight = 260;
        this.labelWidth = 130;
        this.canvasWidth = this.wrapWidth - this.labelWidth;

        this.$canvas = null;
        this.ctx = null;
    }//constructor

    /* ----------------------💛[Builder]---------------------- */

    /**
     * 막대그래프를 그리기 위한 데이터 설정
     * @param {Array} dataBar 
     * [
     *  {
     *    title:year, 
     *    list:[
     *      {title,valuePer,valueR}
     *    ]
     *  },{...}
     * ]
     * valuePer : 퍼센테이지
     * valueR : 실제 값
     * @returns 
     */
    set_data(dataBar){
        this.dataBar = dataBar;
        return this;
    }//set_data

    /**
     * 칼라팔레트 그라디언트를 지정합니다.
     * @param {Array} gradient 
     * [[color1,color2,color3], ...]
     * @returns 
     */
    set_gradient(gradient){
        this.gradient = gradient;
        return this;
    }//set_gradient

    /**
     * 막대그래프 그리기 시작
     * @returns {DOM} $wrap > $canvas
     */
    init(){
        if(!this.dataBar || !this.gradient){
            return console.error('데이터와 색상이 지정되었는지 확인해주세요.');
        }

        /* 📍 DOM */
        /* wrap */
        const $wrap = this.make_wrap();
        /* 라벨 */
        const $labelWrap = this.make_label();
        /* canvas */
        this.$canvas = this.make_canvas();
        this.ctx = this.$canvas.getContext('2d');

        /* 📍 캔버스로 그리기 시작 */
        this.draw_background();

        /* 최종 반환 */
        $wrap.appendChild($labelWrap);
        $wrap.appendChild(this.$canvas);
        return $wrap;
    }//init

    /* ----------------------💛[Func]---------------------- */

    /**
     * 📍
     * 캔버스의 배경을 그린다 (가로선,세로선,라벨 등)
     */
    draw_background(){}//draw_background

}//class-BarGraphBuilder