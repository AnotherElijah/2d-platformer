

export function prepareRexPlugin (plugins, dot) {
    return plugins.get('rexmovetoplugin').add(dot, {
        speed: 600,
        rotateToTarget: true
    }).on('complete', function(){
        console.log('object finished moving');
    });
};

export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}