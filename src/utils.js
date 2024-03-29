import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import React from "react";

export function persentDifference(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
}

export function capitalize(str){
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function colorchoice(asset){
  if(asset.growPercent === 0){
    return "#425af5"
  }else{
   return asset.grow ? '#3f8600' : '#cf1322'
  }
}

export function arrowchoice(asset){
  if(asset.growPercent === 0){
    return <span style={{marginRight: 17}}/>;
  }else{
    return asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>;
  }
}

export function tagcolorchoice(asset){
  if(asset.growPercent === 0){
    return "blue";
  }else{
    return asset.grow ? "green" : "red";
  }
}

export function typecolorchoice(asset){
  if(asset.growPercent === 0){
    return "secondary";
  }else{
    return asset.grow ? "success" : "danger";
  }
}