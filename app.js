import http from "node:http";
import { spawn } from "node:child_process";
import { writeFileSync, existsSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { loadConfig, getRootDir, getUserDataDir } from "./config-store.js";
const root=getRootDir();const config=loadConfig();const dashboardPort=config.dashboard?.port??8181;const dashboardUrl=`http://127.0.0.1:${dashboardPort}/`;const lockFile=resolve(getUserDataDir(),"novamcp.lock");let dashboard=null,shuttingDown=false;
function env(){const e={...process.env};if(process.versions.electron)e.ELECTRON_RUN_AS_NODE="1";return e}
function startDashboard(){dashboard=spawn(process.execPath,[resolve(root,"src","dashboard.js")],{cwd:root,windowsHide:true,stdio:"inherit",env:env()});dashboard.on("exit",code=>{dashboard=null;if(!shuttingDown&&code!==0)process.exitCode=code??1});dashboard.on("error",error=>console.error(`[NovaMCP] Dashboard: ${error.message}`))}
function waitForDashboard(timeoutMs=15000){const started=Date.now();return new Promise((ok,bad)=>{const retry=()=>{if(Date.now()-started>=timeoutMs)return bad(new Error("Dashboard did not start in time"));setTimeout(check,250)};const check=()=>{const req=http.get(dashboardUrl,r=>{r.resume();if((r.statusCode??500)<500)return ok();retry()});req.on("error",retry);req.setTimeout(1000,()=>{req.destroy();retry()})};check()})}
function openBrowser(){const shell=process.env.ComSpec||"C:\\Windows\\System32\\cmd.exe";const c=spawn(shell,["/c","start","",dashboardUrl],{detached:true,stdio:"ignore",windowsHide:true});c.unref()}
async function main(){if(existsSync(lockFile)){try{await waitForDashboard(2500);openBrowser();return}catch{}}writeFileSync(lockFile,String(process.pid));startDashboard();await waitForDashboard();openBrowser()}
function shutdown(code=0){if(shuttingDown)return;shuttingDown=true;try{dashboard?.kill()}catch{}setTimeout(()=>{try{if(existsSync(lockFile))unlinkSync(lockFile)}catch{}process.exit(code)},150)}
process.on("SIGINT",()=>shutdown(0));process.on("SIGTERM",()=>shutdown(0));main().catch(e=>{console.error(`[NovaMCP] ${e.message}`);shutdown(1)});
