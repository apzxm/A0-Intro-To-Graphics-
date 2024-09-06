/* Creative Commons Attribution 4.0 International (CC-BY-4.0) */
/* Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) */
/* This source code was getting from https://github.com/tastejs/todomvc-app-css/blob/03e753aa21bd555cbdc2aa09185ecb9905d1bf16/index.css */

// import styled, { css } from "styled-components";
import styled from "styled-components";
import {AppConfig} from "./AppConfig";

export const Layout = styled.div`
  #transformationviewer-main{
    width: 95%;
  }
  .card{
    height: 90%;
  }
  .anigraphcontainer{
    max-height: ${AppConfig.GraphicsContextResolution}px;
    max-width: ${AppConfig.GraphicsContextResolution}px;
    aspect-ratio: 1;
  }
  
  .anigraph-parent{
    height: 100%;
  }

  .visualization-row{
    max-height: ${AppConfig.GraphicsContextResolution+100}px;
  }
  
  .scene-description{
    font-size: 10pt;
    line-height: 12pt;
    max-height: 150px;
    overflow: scroll;
  }
  h5 {
    font-size: 11pt;
  }
`;
