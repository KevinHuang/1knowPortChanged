var _1know = angular.module('1know', ['ngRoute', 'ngAnimate', 'pascalprecht.translate'])
.config(function($routeProvider, $locationProvider, $sceProvider, $translateProvider) {
	$routeProvider
		.when('/', {
			//templateUrl: ['/template/welcome.html?', Date.now()].join(''),
			templateUrl: ['/template/welcome_code.html?', Date.now()].join(''),
			controller: 'WelcomeCtrl',
			controllerAs: 'welcomeCtrl'
		})
		.when('/oauth', {
			templateUrl: ['/template/welcome_oauth.html?', Date.now()].join(''),
			controller: 'WelcomeCtrl',
			controllerAs: 'welcomeCtrl'
		})
		.when('/code', {
			templateUrl: ['/template/welcome_code.html?', Date.now()].join(''),
			controller: 'WelcomeCtrl',
			controllerAs: 'welcomeCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.hashPrefix('!');
	$sceProvider.enabled(false);

	$translateProvider.translations('zh-cn', translations['zh-cn']);
})
.controller('WelcomeCtrl', function($scope, $http, $location, $timeout, $translate) {
	var self = this;

	self.BASE_URL = [$location.protocol(), '://', $location.host(), ':', $location.port()].join('');
	self.language = { title: 'English', type: 'en-us' };

	self.scrollTo = function() {
		$("html, body").animate({ scrollTop: 658 }, 1000);
	}
	
	var lang = { title: '简体中文', type: 'zh-cn' };
	self.language.title = lang.title;
	self.language.type = lang.type;

	$translate.uses(lang.type);
	self.account = 'NotLogin';
	
	window.onresize = function() {
		$scope.$apply(function() {
			self.contentWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
			self.contentHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 91;
		});
	}

	self.signinWithGuest = function() {
		$http.post([self.BASE_URL, '/account/guest'].join(''))
		.success(function(response, status) {
			window.location.reload();
		});
	}

	self.signinWithIschool = function() {
		var width = 800;
		var height = 700;
		var top = (screen.height/2)-(height/2);
		var left = (screen.width/2)-(width/2);
		var target = ['https://auth.ischoolcenter.com/oauth/authorize.php?client_id=',client_id,'&response_type=code&state=ischool_authbug_code&redirect_uri=',redirect_uri,'&scope=User.Mail,User.BasicInfo'].join('');

		window.open(target, '1409620722041', ['width=',width,',height=',height,',menubar=0,titlebar=0,status=0,top=',top,',left=',left].join(''));
	}

	self.loginGuest = function(event) {
		if (event !== undefined)
			if (event.keyCode !== 13)
				return;

		if (self.guestCode === undefined || self.guestCode === '') return;

		$http.post([self.BASE_URL, '/account/switch'].join(''), { email: [self.guestCode, '@1know.net'].join('') })
		.success(function(response, status) {
			if (!response.error)
				window.location.reload();
		});
	}

	self.contentWidth = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
	self.contentHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 91;
})
