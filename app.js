function userfrm(carg)
{	let TK=`
	<form id='F1' class='axfrmmed'>
		<center>REGISTRAR</center>
		<input name='carg'  value='${carg}'  type='hidden'>
		<label>Nombre</label>
		<input name='nom'>
		<label>Apellido</label>
		<input name='ap'>
		<label>Carnet de identidad</label>
		<input name='ci'>
		<label>Contraseña</label>
		<input name='pwd' type='password'>
		<button>GUARDAR</button>
	</form>`;
	axload('C1',TK);
	axelem('F1').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/usersave`,'F1');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se guardo');	}
		else
		{	axmsgerr('No se guardo');	}
	})
}

function login()
{	let TK=`
	<form  id='F2' class='axfrmmed axw-frm axbr-2'>
		<center>Iniar sesion</center>
		<label>Carnet</label>
		<input name='ci'>
		<label>Contraseña</label>	
		<input name='pwd' type='password'>
		<button>INGRESAR</button>
	</form>`;
	axload('C1',TK);
	axelem('F2').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/login`,'F2');
		console.log(data);
		if(data.resp)
		{	axtokenset(data.num,`${data.nom} ${data.ap}`,'',[data.carg]);
			axmsgmin('Se inicio sesion');
			inicio();
		}
		else
		{	axmsgerr('Contraseña incorrecta');	}
	})
}

function inicio()
{	carg=axtokenget('aud')[0];
	switch(carg)
	{	case'cli': 	cargo='Cliente'; break;
		case'oper': cargo='Operador'; break;
		case'adm': 	cargo='Administrador'; break;
	}
	let TK=`
	<header>
		<nav>
			<a>inicio</a>
			<a>nosotros</a>
			<button  class='axico399' onclick="axtokendel('index.html')"></button>
		</nav>
	</header>
	<main>
		<section  id='C2'></section>
		<nav class='axmenmed'>
			<center>${axtokenget('name')}</center>
			<center>${cargo}</center>`;
			if(carg=='adm' || carg=='oper')
			{	TK+=`
				<label>Rentas</label>
				<a  onclick="rentfrm()">Registrar renta</a>
				<a  onclick="rentlist()">Lista de rentas</a>
				<label>Usuarios</label>
				<a  onclick="userfrm('cli')">Registrar cliente</a>
				<a  onclick="userfrm('oper')">Registrar operador</a>
				<a  onclick="userlist()">Lista de usuarios</a>`;
			}

			if(carg=='adm')
			{	TK+=`
				<label>Autos</label>
				<a  onclick="autofrm(0,'')">Registrar auto</a>
				<a  onclick="autolist()">Lista de autos</a>`;
			}

			TK+=`
			<label>Cuenta</label>
			<a  onclick="axtokendel('index.html')">Cerrar sesion</a>
		</nav>
	</main>
	<footer>
		<section id='V1' class='axwinmed'>
			<button class='axico168' onclick="axwinclose('V1')"></button>
			<article  id='V1C'>
			</article>
		</section>
	</footer>`;
	axload('C1',TK);
}

async function userlist()
{	let TK=`
	<h2 class='axtitle'>Lista de usuarios</h2>`;
	let data=await axdataget(`api/userlist`);
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  class='axlistmed'>
			<article>
				<h2>${data.list[P].nom} ${data.list[P].ap}</h2>
				<a class='axico421' onclick="axelemshow('M${data.list[P].num}')"></a>
				<div id='M${data.list[P].num}' onclick="axelemhide('M${data.list[P].num}')">
					<nav  class='axmenmed'>
						<a onclick="autofrm(${data.list[P].num},'${data.list[P].nom}')"> Registrar auto</a>
					</nav>
				</div>
			</article>
		</section>`;
	}
	axload('C2',TK);
}

function autofrm(num,nom)
{	let TK=`
	<form id='F3' class='axfrmmed'>
		<center>Registro de auto</center>
		<aside>
			<h2  id='usercap'>${nom}</h2>
			<input id='userid'  name='num' value='${num}' type='hidden'>
			<a  class='axico117' onclick="userselec('userid','usercap','')"></a>
		</aside>
		<section>
			<article>
				<input name='placa' placeholder='Placa'>
			</article>
			<article>
				<input name='chas'  placeholder='Chasis'>
			</article>
			<article>
				<input name='mode'  placeholder='Modelo'>
			</article>
		</section>
		<textarea  name='des' rows=3 placeholder='Descripción'></textarea>
		<button>GUARDAR</button>
	</form>`;
	axload('C2',TK);
	axelem('F3').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/autosave`,'F3');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se registro');	}
		else
		{	axmsgerr('No se registro');}
	})
}


async function autoedit(numa)
{	let data=await axdataget(`api/autoinfo/${numa}`);
	console.log(data);
	let TK=`
	<form id='F5' class='axfrmmed'>
		<center>Edición de auto</center>
		<input name='numa'  value='${numa}'  type='hidden'>
		<aside>
			<h2  id='usercap'>${data.nom} ${data.ap}</h2>
			<input id='userid'  name='num' value='${data.num}' type='hidden'>
			<a  class='axico117' onclick="userselec('userid','usercap','')"></a>
		</aside>
		<section>
			<article>
				<input name='placa' placeholder='Placa' value='${data.placa}'>
			</article>
			<article>
				<input name='chas'  placeholder='Chasis' value='${data.chas}'>
			</article>
			<article>
				<input name='mode'  placeholder='Modelo'  value='${data.mode}'>
			</article>
		</section>
		<textarea  name='des' rows=3 placeholder='Descripción'>${data.des}</textarea>
		<button>GUARDAR</button>
	</form>`;
	axload('C2',TK);
	axelem('F5').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/autoup`,'F5');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se modifico');	}
		else
		{	axmsgerr('No se modifico');}
	})
}


async function autolist()
{	let TK=`
	<h2 class='axtitle'>Lista de autos</h2>`;
	let data=await axdataget(`api/autolist`);
	console.log(data);
	TK+=`
	<table class='axtblmin'>
		<thead>
			<tr><td>Placa</td> <td>Chasis</td> <td>Dueño</td> <td>Acciones</td> </tr>
		</thead>
		<tbody>`;
			for(P=0; P<data.list.length; P++)
			{	TK+=`
				<tr id='auto${data.list[P].numa}'>
					<td>${data.list[P].placa}</td>
					<td>${data.list[P].chas}</td>
					<td>${data.list[P].nom} ${data.list[P].ap}</td>
					<td>
						<a class='axico131'  onclick="autoedit(${data.list[P].numa})">
						<a class='axico135'  onclick="autodel(${data.list[P].numa})">
					</td>
				</tr>`;
			}
			TK+=`
		</tbody>
	</table>`;

	if(data.list.length==0)
	{	TK+=`<center  class='axsubtitle'>No hay registros</center>`;
	}
	axload('C2',TK);
}

function autodel(numa)
{	axmsgconfirm('Estas seguro?').then(async res=>
	{	if(res)
		{	let data=await axdataget(`api/autodel/${numa}`);
			if(data.resp)
			{	axmsgmin('Se elimino');
				axelemhide(`auto${numa}`);
			}
		}
	})
}


async function autoselec(ide,cap,busq)
{	axwinopen('V1');
	if(busq==undefined){busq='';}
	let data=await axdataget(`api/autolist/${busq}`);
	console.log(data);
	let TK=`
	<form  id='F6' class='axbarmed'>
		<button class='axico117'></button>
		<input id='BUSQ' value='${busq}'>
	</form>`;
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  class='axlistmed axefecfocus' onclick="axelem('${ide}').value=${data.list[P].numa}; axelem('${cap}').innerHTML='${data.list[P].placa}'; axwinclose('V1');">
			<article>
				<aside>
					<h2>Placa: ${data.list[P].placa}</h2>
					<h3>Chasis: ${data.list[P].chas} (${data.list[P].nom} ${data.list[P].ap})</h3>
				</aside>
			</article>
		</section>`;
	}
	axload('V1C',TK);
	axelem('F6').addEventListener('submit',e=>
	{	e.preventDefault();
		userselec(ide,cap,axelem('BUSQ').value);
	})
}

async function userselec(ide,cap,busq)
{	axwinopen('V1');
	if(busq==undefined){busq='';}
	let data=await axdataget(`api/userlist/${busq}`);
	console.log(data);
	let TK=`
	<form  id='F4' class='axbarmed'>
		<button class='axico117'></button>
		<input id='BUSQ' value='${busq}'>
	</form>`;
	for(P=0; P<data.list.length; P++)
	{	TK+=`
		<section  class='axlistmed axefecfocus' onclick="axelem('${ide}').value=${data.list[P].num}; axelem('${cap}').innerHTML='${data.list[P].nom}'; axwinclose('V1');">
			<article>
				<h2>${data.list[P].nom} ${data.list[P].ap}</h2>
			</article>
		</section>`;
	}
	axload('V1C',TK);
	axelem('F4').addEventListener('submit',e=>
	{	e.preventDefault();
		userselec(ide,cap,axelem('BUSQ').value);
	})
}

function rentfrm()
{	let TK=`
	<form id='F5' class='axfrmmed'>
		<center>Registro de renta</center>
		<section>
			<article>
				<label>Usuario que rentara</label>
				<aside>
					<h2  id='usercap'></h2>
					<input id='userid'  name='num' type='hidden'>
					<a  class='axico117' onclick="userselec('userid','usercap','')"></a>
				</aside>
			</article>
			<article>
				<label>Auto que se rentara</label>
				<aside>
					<h2  id='autocap'></h2>
					<input id='autoid'  name='numa' type='hidden'>
					<a  class='axico117' onclick="autoselec('autoid','autocap','')"></a>
				</aside>
			</article>
		</section>
		<section>
			<article>
				<label>Fecha de salida</label>
				<input  name='fechs'  type='datetime-local'>
			</article>
			<article>
				<label>Fecha de entrega</label>
				<input  name='feche'  type='datetime-local'>
			</article>
			<article>
				<label></label>
				<button>Guardar</button>
			</article>
		</section>
	</form>`;
	axload('C2',TK);
	axelem('F5').addEventListener('submit',async e=>
	{	e.preventDefault();
		let data=await axdatapost(`api/rentsave`,'F5');
		console.log(data);
		if(data.resp)
		{	axmsgok('Se registro');	}
		else
		{	axmsgerr('No se registro');}
	})
}


async function rentlist()
{	let TK=`
	<h2 class='axtitle'>Lista de autos rentados</h2>`;
	let data=await axdataget(`api/rentlist`);
	console.log(data);
	
	TK+=`
	<table class='axtblmin'>
		<thead>
			<tr><td>Cliente</td> <td>Auto</td> <td>Fecha de salida</td> <td>Fecha de entrega</td> <td>Estado</td> </tr>
		</thead>
		<tbody>`;
			for(P=0; P<data.list.length; P++)
			{	TK+=`
				<tr id='rent${data.list[P].numr}'>
					<td>${data.list[P].nom} ${data.list[P].ap}</td>
					<td>${data.list[P].placa}</td>
					<td>${axfech(data.list[P].fechs,'datetime')}</td>
					<td>${data.list[P].feche}</td>
					<td>${data.list[P].stdr}</td>
					<td>
						<a class='axico131'  onclick="">
						<a class='axico135'  onclick="">
					</td>
				</tr>`;
			}
			TK+=`
		</tbody>
	</table>`;

	if(data.list.length==0)
	{	TK+=`<center  class='axsubtitle'>No hay registros</center>`;
	}
	axload('C2',TK);

}