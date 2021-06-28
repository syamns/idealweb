(function($) {




	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

  var carousel = function() {
		$('.home-slider').owlCarousel({
	    loop:true,
	    autoplay: true,
	    margin:0,
	    animateOut: 'fadeOut',
	    animateIn: 'fadeIn',
	    nav:true,
	    dots: true,
	    autoplayHoverPause: false,
	    items: 1,
	    navText : ["<span class='ion-ios-arrow-back'></span>","<span class='ion-ios-arrow-forward'></span>"],
	    responsive:{
	      0:{
	        items:1
	      },
	      600:{
	        items:1
	      },
	      1000:{
	        items:1
	      }
	    }
		});

		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });


  var counter = function() {
		
		$('#section-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();

	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	$('.appointment_date').datepicker({
	  'format': 'm/d/yyyy',
	  'autoclose': true
	});

	$('.appointment_time').timepicker();


})(jQuery);

sendMail=()=>{
	
	var forms = document.getElementsByClassName('needs-validation');

  
  // Iterate over each one
  for (let form of forms) {
  
    // Add a 'submit' event listener on each one
    form.addEventListener('submit', (evt) => {
    
      // check if the form input elements have the 'required' attribute  
      if (!form.checkValidity()) {
        evt.preventDefault();
        evt.stopPropagation();
        console.log('Bootstrap will handle incomplete form fields');
      } else {
        // Since form is now valid, prevent default behavior..
        evt.preventDefault();
		let message = "service :"+ $("#serviceType").val() +
	" Contact:"+$("#contact").val()+" on (Date)" + $("#appointmentDate").val()+
	" Time:"+ $("#appointmentTime").val()+" Message:"+ $("#Message").val()

	let name =$("#name").val()
        sendMessage(message,name,forms);
      }
      
      form.classList.add('was-validated');
      
    });
    
  }

	
}

sendMessage=(message,name,forms)=>{
	console.log(message);
	console.log(name);
	$.ajax({
		method: 'POST',
		url: 'https://formsubmit.co/ajax/shyamsanthosh16@gmail.com',
		dataType: 'json',
		accepts: 'application/json',
		data: {
			name: name,
			message: message
		},
		success: (data) => {

		$("#success_tic").modal("toggle");
		$('.needs-validation').trigger("reset");
		$('.needs-validation').removeClass("was-validated");
		},
		error: (err) => console.log(err)
	});

}


$(document).ready(()=>{
//getAllProduct();
	//UploadProcess();
	Display();
	AppendDate();
	$('.my-news-ticker').AcmeTicker({
		controls: {
			prev: $('.acme-news-ticker-prev'),
			toggle: $('.acme-news-ticker-pause'),
			next: $('.acme-news-ticker-next')
		},
		type: 'marquee',
		pauseOnFocus: true,
		pauseOnHover: true,
		speed:0.07
	});
})


getAllProduct=()=>{
	$.ajax({
		type:'GET',
		url: "https://idealcrud.herokuapp.com/product/list",
		contentType: 'application/json',

		success: function(result) {
			console.log(result)

			$("#productList").append(
				'<tr>'+
					'<th scope="row">1</th>'+
					'<td>Mark</td>'+
					'<td>Otto</td>'+
					'<td>@mdo</td>'+

				'</tr>'

			);
		}});
}
/*loadFile=()=>{
	var fileUpload;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/files/Book1.xlsx", true);
	xhr.responseType = "blob";
	xhr.onload = function (e) {
		var file = this.response;
		var reader = new FileReader();
		//For Browsers other than IE.
		if (reader.readAsBinaryString) {
			reader.onload = function (e) {
				fileUpload= e.target.result;
				UploadProcess(fileUpload)
			};
			reader.readAsBinaryString(file);
		} else {
			//For IE Browser.
			reader.onload = function (e) {
				var data = "";
				var bytes = new Uint8Array(e.target.result);
				for (var i = 0; i < bytes.byteLength; i++) {
					data += String.fromCharCode(bytes[i]);
				}
				fileUpload=data;
			};
			reader.readAsArrayBuffer(file);
		}
	};
	xhr.send();
}*/
/*
function UploadProcess(file) {


	//Reference the FileUpload element.
	var fileUpload =file;

	//Validate whether File is valid Excel file.
	var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
	if (regex.test(fileUpload.value.toLowerCase())) {
		if (typeof (FileReader) != "undefined") {
			var reader = new FileReader();

			//For Browsers other than IE.
			if (reader.readAsBinaryString) {
				reader.onload = function (e) {
					GetTableFromExcel(e.target.result);
				};
				reader.readAsBinaryString(fileUpload.files[0]);
			} else {
				//For IE Browser.
				reader.onload = function (e) {
					var data = "";
					var bytes = new Uint8Array(e.target.result);
					for (var i = 0; i < bytes.byteLength; i++) {
						data += String.fromCharCode(bytes[i]);
					}
					GetTableFromExcel(data);
				};
				reader.readAsArrayBuffer(fileUpload.files[0]);
			}
		} else {
			alert("This browser does not support HTML5.");
		}
	} else {
		alert("Please upload a valid Excel file.");
	}
};
function GetTableFromExcel(data) {
	//Read the Excel File data in binary
	var workbook = XLSX.read(data, {
		type: 'binary'
	});

	//get the name of First Sheet.
	var Sheet = workbook.SheetNames[0];

	//Read all rows from First Sheet into an JSON array.
	var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[Sheet]);

	//Create a HTML Table element.
	var myTable  = document.createElement("table");
	myTable.border = "1";

	//Add the header row.
	var row = myTable.insertRow(-1);

	//Add the header cells.
	var headerCell = document.createElement("TH");
	headerCell.innerHTML = "Id";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Name";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Country";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Age";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Date";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Gender";
	row.appendChild(headerCell);


	//Add the data rows from Excel file.
	for (var i = 0; i < excelRows.length; i++) {
		//Add the data row.
		var row = myTable.insertRow(-1);

		//Add the data cells.
		var cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Id;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Name;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Country;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Age;

		cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Date;	cell = row.insertCell(-1);
		cell.innerHTML = excelRows[i].Gender;
	}


	var ExcelTable = document.getElementById("ExcelTable");
	ExcelTable.innerHTML = "";
	ExcelTable.appendChild(myTable);
};



*/
function Display() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "../files/Book1.xlsx", true);
	xhr.responseType = "blob";
	xhr.onload = function (e) {
		var file = this.response;
		var reader = new FileReader();
		//For Browsers other than IE.
		if (reader.readAsBinaryString) {
			reader.onload = function (e) {
				ProcessExcel(e.target.result);
			};
			reader.readAsBinaryString(file);
		} else {
			//For IE Browser.
			reader.onload = function (e) {
				var data = "";
				var bytes = new Uint8Array(e.target.result);
				for (var i = 0; i < bytes.byteLength; i++) {
					data += String.fromCharCode(bytes[i]);
				}
				ProcessExcel(data);
			};
			reader.readAsArrayBuffer(file);
		}
	};
	xhr.send();
};
function ProcessExcel(data) {
	//Read the Excel File data.
	var workbook = XLSX.read(data, {
		type: 'binary'
	});

	//Fetch the name of First Sheet.
	var firstSheet = workbook.SheetNames[0];

	//Read all rows from First Sheet into an JSON array.
	var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

	//Create a HTML Table element.
	var table = document.createElement("table");
	table.border = "1";

	//Add the header row.
	var row = table.insertRow(-1);

	//Add the header cells.
	var headerCell = document.createElement("TH");
	headerCell.innerHTML = "No";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Items";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Malayalam";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Qnty";
	row.appendChild(headerCell);

	headerCell = document.createElement("TH");
	headerCell.innerHTML = "Price";
	row.appendChild(headerCell);


	//Add the data rows from Excel file.
	for (var i = 0; i < excelRows.length; i++) {
		//Add the data row.
		var row = table.insertRow(-1);

		//Add the data cells.
		var cell = row.insertCell(-1);

		cell.innerHTML = (excelRows[i].No==undefined?"":excelRows[i].No);


		cell = row.insertCell(-1);
		cell.innerHTML = (excelRows[i].Items==undefined?"":excelRows[i].Items);

		cell = row.insertCell(-1);

		cell.innerHTML =(excelRows[i].Malayalam==undefined?"":excelRows[i].Malayalam);

		cell = row.insertCell(-1);
		cell.innerHTML = (excelRows[i].Qnty==undefined?"":excelRows[i].Qnty);

		cell = row.insertCell(-1);
		cell.innerHTML = (excelRows[i].Price==undefined?"":excelRows[i].Price);
	}

	var dvExcel = document.getElementById("ExcelTable");
	dvExcel.innerHTML = "";
	dvExcel.appendChild(table);
	$("#ExcelTable table").addClass('table table-striped mt-1 table-responsive')
	$("#ExcelTable table thead").addClass('thead-dark')
};

AppendDate=()=>{
	let date = new Date();
	$(".today").append("Date:"+getFormattedDate(date))
	console.log(date)
}
function getFormattedDate(date) {
	var year = date.getFullYear();

	var month = (1 + date.getMonth()).toString();
	month = month.length > 1 ? month : '0' + month;

	var day = date.getDate().toString();
	day = day.length > 1 ? day : '0' + day;

	return month + '/' + day + '/' + year;
}


getModalList=()=>{

$("#exampleModal").modal('toggle');
}