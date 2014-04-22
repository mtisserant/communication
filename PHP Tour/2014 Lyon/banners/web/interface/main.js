/* banners choice */
var bannerSet = {
    formats: {
        leaderboard: {
            label: 'Bannière longue 728x90',
            badges: {
                platinum: {label: '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> Platine', basename: 'base_728x90_platinum'},
                gold: {label: '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> Or', basename: 'base_728x90_gold'},
                silver: {label: '<span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span> Argent', basename: 'base_728x90_silver'},
                bronze: {label: '<span class="glyphicon glyphicon-star"></span> Bronze', basename: 'base_728x90_bronze'},
                love: {label: '<span class="glyphicon glyphicon-heart"></span> I Love PHP', basename: 'base_728x90_love'},
                forever: {label: '<span class="glyphicon glyphicon-star-empty"></span> PHP Forever', basename: 'base_728x90_forever'}
            }
        }
    }
};

var presets = {
    original: {label:'Original', primary:'#150e08', secondary:'#c75a19', ternary:'#fceac2'},
    afup: {label:'PHP Tour', primary:'#1f3574', secondary:'#5589de', ternary:'#fcfcfc'},
    ol: {label:'OL', primary:'#1c5bb0', secondary:'#d90114', ternary:'#ffffff'},
    bob: {label:'Jamaica', primary:'#000000', secondary:'#308a2a', ternary:'#f9da00'},
    fluo: {label:'Fluo', primary:'#00ff9e', secondary:'#f81aa2', ternary:'#ffff00'},
    yes: {label:'Yes we can', primary:'#00314F', secondary:'#E70000', ternary:'#FDE7A3'},
    kitty: {label:'Hello kitty', primary:'#f81aa2', secondary:'#000000', ternary:'#ffffff'},
    sixties: {label:'Années 60', primary:'#431e00', secondary:'#ff6f00', ternary:'#fff699'},
    ironman: {label:'Iron Man', primary:'#990000', secondary:'#F5D300', ternary:'#ffffff'}
};


var primaryColor = '#150e08';
var secondaryColor = '#c75a19';
var ternaryColor = '#fceac2';
var svg;

function loadSvg(elem)
{
    $('#banner').remove();
    $('#canvas').append('<svg id="banner" width="728" height="90"></svg>');
    var s = Snap('#banner');
    Snap.load('banners/' + elem.value + '.svg', function(f) {
        svg = s.append(f);
    });
}

function changeTheme(theme){
    primaryColor = presets[theme].primary;
    secondaryColor = presets[theme].secondary;
    ternaryColor = presets[theme].ternary;
    primaryColorPicker.setHex(primaryColor);
    secondaryColorPicker.setHex(secondaryColor);
    ternaryColorPicker.setHex(ternaryColor);
    updateSvgColors();
}

function updateSvgColors()
{
    Snap.selectAll('.primary').attr({
        fill: primaryColor
    });
    Snap.selectAll('.primary path').attr({
        fill: primaryColor
    });
    Snap.selectAll('.secondary').attr({
        fill: secondaryColor
    });
    Snap.selectAll('.secondary path').attr({
        fill: secondaryColor
    });
    Snap.selectAll('.ternary').attr({
        fill: ternaryColor
    });
    Snap.selectAll('.ternary path').attr({
        fill: ternaryColor
    });
}

function updatePrimaryColor(hex)
{
    primaryColor = hex;
    updateSvgColors();
}
function updateSecondaryColor(hex)
{
    secondaryColor = hex;
    updateSvgColors();
}
function updateTernaryColor(hex)
{
    ternaryColor = hex;
    updateSvgColors();
}

function save() {
    saveSvgAsPng(document.getElementById("banner"), "banner.png");
}

/* build interface */
//setting default banner
var s = Snap('#banner');
Snap.load('banners/base_728x90_platinum.svg', function(f) {
    svg = s.append(f);
});

//badge choice
var badges = bannerSet.formats.leaderboard.badges;
for(var prop in badges){
    $('#step1').append(
        '<button onclick="loadSvg(this);" value="'+badges[prop].basename+'" class="btn btn-default btn-lg">'
        +badges[prop].label
        +'</button> ');
}

//theme choice
for(var prop in presets){
    $('#step2').append(
        '<button onclick="changeTheme(\''+prop+'\');" class="btn btn-default btn-lg">'
        +'<span class="swatch" style="background-color:'+presets[prop].primary+';">&nbsp;</span>'
        +'<span class="swatch" style="background-color:'+presets[prop].secondary+';">&nbsp;</span>'
        +'<span class="swatch" style="background-color:'+presets[prop].ternary+';">&nbsp;</span>'
        +presets[prop].label
        +'</button> ');
}

var primaryColorPicker = ColorPicker(document.getElementById('primaryColorPicker'), updatePrimaryColor);
primaryColorPicker.setHex(primaryColor);
var secondaryColorPicker = ColorPicker(document.getElementById('secondaryColorPicker'), updateSecondaryColor);
secondaryColorPicker.setHex(secondaryColor);
var ternaryColorPicker = ColorPicker(document.getElementById('ternaryColorPicker'), updateTernaryColor);
ternaryColorPicker.setHex(ternaryColor);