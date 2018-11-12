<%@page import="com.yumu.hexie.web.CommunityController"%>
<%@page import="com.yumu.hexie.model.community.Thread"%>
<%@page import="com.yumu.hexie.model.user.User"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<% 

User user = new User();
user.setCity("上海市");
user.setCityId(20);
user.setProvince("上海");
user.setProvinceId(19);
user.setId(10);
user.setOpenid("o_3DlwdnCLCz3AbTrZqj4HtKeQYY");
user.setName("yiming");
user.setNickname("yiming");
user.setXiaoquName("宜川一村");
user.setXiaoquId(169);
user.setCountyId(27);
user.setWuyeId("CM150821400000009761");
user.setHeadimgurl("http://wx.qlogo.cn/mmopen/ajNVdqHZLLBIY2Jial97RCIIyq0P4L8dhGicoYDlbNXqW5GJytxmkRDFdFlX9GScrsvo7vBuJuaEoMZeiaBPnb6AA/0");


HttpSession s = request.getSession();
session.setAttribute("sessionUser", user);

%>


reset session successfully!
</body>
</html>