
class animation {
    animList = [
        require('../BladeLinageFaust/Idle.gif'),
        require('../BladeLinageFaust/Skill1.mp4'),
        require('../BladeLinageFaust/Skill2.mp4'),
        require('../BladeLinageFaust/Skill3.mp4'),
    ]

    getAnim(index){
        return this.animList[index]
    }
}

export default animation;

