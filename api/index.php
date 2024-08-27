<?php
header("Content-Type: application/json");
$BDD=new mysqli("localhost","root","redes2024","pluscar");

$tam=strlen(dirname($_SERVER["SCRIPT_NAME"]));
if($tam==1){$inc=0;}else{$inc=1;}
$ruta=explode("/",substr($_SERVER["REQUEST_URI"],$tam+$inc));

$data=array("resp"=>false,"msg"=>"Hola mundo","ruta"=>$ruta);
switch($ruta[0])
{	case "userlist":
		if(isset($ruta[1])){$busq=$ruta[1];}else{$busq='';}
		$list=array();
		$M=$BDD->query("select num,nom,ap,ci from user where std='act' and (nom like '%$busq%'  or ap like  '%$busq%' ) ");
		foreach($M as $V)
		{	array_push($list,array("num"=>$V["num"],"nom"=>$V["nom"],"ap"=>$V["ap"],  "ci"=>$V["ci"]));
		}
		$data=array("resp"=>true,"list"=>$list);
	break;

	case "usersave":
		$nom=$_POST["nom"];
		$ap=$_POST["ap"];
		$ci=$_POST["ci"];
		$carg=$_POST["carg"];
		$pwd=sha1($_POST["pwd"]);
		if($BDD->query("insert into user (nom,ap,ci,pwd,std,carg) values ('$nom','$ap',   '$ci','$pwd','act','$carg')"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro usuario");
	break;

	case"login":
		$ci=$_POST["ci"];
		$pwd=sha1($_POST["pwd"]);
		$data=array("resp"=>false,"msg"=>"Contrasaña incorrecta");
		$M=$BDD->query("select num,nom,ap,carg from user where ci='$ci' and pwd='$pwd' ");
		foreach($M as $V)
		{	$data=array("resp"=>true,"num"=>$V["num"],"nom"=>$V["nom"],"ap"=>$V["ap"],"carg"=>$V["carg"]);
		}
	break;

	case "autosave":
		$num=$_POST["num"];
		$placa=$_POST["placa"];
		$chas=$_POST["chas"];
		$mode=$_POST["mode"];
		$des=$_POST["des"];
		if($BDD->query("insert into auto (placa,chas,mode,des,stda,num) values ('$placa','$chas','$mode','$des','act',$num)"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro auto");
	break;

	case "autolist":
		$list=array();
		$M=$BDD->query("select numa,placa,chas,nom,ap from auto,user where auto.num=user.num  and std='act' ");
		foreach($M as $V)
		{	array_push($list,array("numa"=>$V["numa"],"placa"=>$V["placa"],"chas"=>$V["chas"],"nom"=>$V["nom"],"ap"=>$V["ap"]));
		}
		$data=array("resp"=>true,"list"=>$list);
	break;

	case"autoinfo":
		if(isset($ruta[1])){$numa=$ruta[1];}else{$numa=0;}
		$M=$BDD->query("select placa,chas,mode,des,stda,num from auto where numa=$numa ");
		foreach($M as $V)
		{	$num=$V["num"];
			$M2=$BDD->query("select nom,ap from user where num=$num ");
			foreach($M2 as $V2)
			{	$data=array("resp"=>true,"placa"=>$V["placa"],"chas"=>$V["chas"],"mode"=>$V["mode"],"des"=>$V["des"],"stda"=>$V["stda"],"num"=>$num,"nom"=>$V2["nom"],"ap"=>$V2["ap"]);
			}
		}
	break;

	case'autoup':
		$numa=$_POST["numa"];
		$placa=$_POST["placa"];
		$chas=$_POST["chas"];
		$mode=$_POST["mode"];
		$des=$_POST["des"];
		$num=$_POST["num"];
		if($BDD->query("update auto set  placa='$placa',chas='$chas',mode='$mode',des='$des',num=$num  where numa=$numa"))
		{	$resp=true;		}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"actualizo auto");
	break;

	case"autodel":
		if(isset($ruta[1])){$numa=$ruta[1];}else{$numa=0;}
		if($BDD->query("delete from auto where numa=$numa"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Eliminar auto");
	break;

	case "rentsave":
		$num=$_POST["num"];
		$numa=$_POST["numa"];
		$fechs=$_POST["fechs"];
		$feche=$_POST["feche"];
		if($BDD->query("insert into rent (num,numa,fechs,feche,stdr) values ($num,$numa,'$fechs','$feche','pro')"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro renta");
	break;

	case "rentlist":
		$list=array();
		$M=$BDD->query("select numr,rent.num as num,nom,ap,rent.numa as numa,placa,fechs,feche,stdr from user,auto,rent where user.num=rent.num and auto.numa=rent.numa   ");
		foreach($M as $V)
		{	array_push($list,$V);
		}
		$data=array("resp"=>true,"list"=>$list);
	break;

	/*
	case "oso":
		$data=array("resp"=>true,"msg"=>"Soy oso");
	break;

	case "prodsave":
		$nomp=$_POST["nomp"];
		if($_POST["prec"]==''){$prec=0;}else{$prec=$_POST["prec"];}
		$des=$_POST["des"];
		$categ=$_POST["categ"];
		$fechr=date("Y-m-d");
		if($BDD->query("insert into prod (nomp,prec,des,fechr,categ)      values ('$nomp',$prec,'$des','$fechr','$categ')"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Registro prod");
	break;

	case "prodlist":
		//if(isset($_POST["busq"])){$busq=$_POST["busq"];}else{$busq="";}
		if(isset($ruta[1])){$busq=$ruta[1];}else{$busq="";}
		$list=array();
		$M=$BDD->query("select nump,nomp,prec from prod where nomp like '%$busq%' ");
		foreach($M as $V)
		{	array_push($list,array("nump"=>$V["nump"],"nomp"=>$V["nomp"],"prec"=>$V["prec"]));
		}
		$data=array("resp"=>true,"list"=>$list);
	break;

	case"prodinfo":
		if(isset($ruta[1])){$nump=$ruta[1];}else{$nump=0;}
		$M=$BDD->query("select * from prod where nump=$nump ");
		foreach($M as $V)
		{	$data=array("resp"=>true,"nump"=>$V["nump"],"nomp"=>$V["nomp"],     "prec"=>$V["prec"],"des"=>$V["des"],"categ"=>$V["categ"]);
		}
	break;


	case"userdel":
		if(isset($ruta[1])){$num=$ruta[1];}else{$num=0;}
		if($BDD->query("delete from user where num=$num"))
		{	$resp=true;	}
		else
		{	$resp=false;	}
		$data=array("resp"=>$resp,"msg"=>"Eliminar usuario");
	break;
	*/
}
echo json_encode($data);
?>
