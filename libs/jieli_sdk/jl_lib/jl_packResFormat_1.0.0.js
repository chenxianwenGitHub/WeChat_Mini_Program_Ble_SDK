"use strict";class t{parseData(t){let e=0;this.u16Crc=t[e++]+(t[e++]<<8),this.u8Length=t[e++],this.u8Index=t[e++],this.szName=new Uint8Array(5),this.szName=t.slice(4,9)}}class e{parseData(t){let e=0;this.u32Tag=t[e++]+(t[e++]<<8)+(t[e++]<<16)+(t[e++]<<24),this.u16Crc=t[e++]+(t[e++]<<8),this.u16Res=t[e++]+(t[e++]<<8),this.u32Res=t[e++]+(t[e++]<<8)+(t[e++]<<16)+(t[e++]<<24),this.u32Count=t[e++]+(t[e++]<<8)+(t[e++]<<16)+(t[e++]<<24)}}class s{constructor(){this.stHead=new e,this.stItem=[new t]}parseData(t){this.stHead.parseData(t.slice(0,16)),this.stItem[0].parseData(t.slice(16,25))}}class i{constructor(){this.u16Crc=0,this.u16DataCrc=0,this.u32Address=0,this.u32Length=0,this.u8Attribute=0,this.u8Res=0,this.u16Index=0}parseData(t){let e=0;this.u16Crc=t[e++]+(t[e++]<<8),this.u16DataCrc=t[e++]+(t[e++]<<8),this.u32Address=t[e++]+(t[e++]<<8)+(t[e++]<<16)+(t[e++]<<24),this.u32Length=t[e++]+(t[e++]<<8)+(t[e++]<<16)+(t[e++]<<24),this.u8Attribute=t[e++],this.u8Res=t[e++],this.u16Index=t[e++]+(t[e++]<<8),this.szFileName=t.slice(16,32)}}class r{constructor(t,e,s){this.name=t,this.offset=e,this.len=s}}function n(t){for(var e="",s=0;s<t.length;s++)e+=String.fromCharCode(t[s]);return e}function a(t,e,s){let i,r,n=s,a=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935];for(i=0;0!=e--;)r=i>>12,i<<=4,i&=65535,i^=a[r^Math.trunc(t[n]/16)],r=i>>12,i<<=4,i&=65535,i^=a[r^15&t[n]],n++;return i}exports.PackResFormat=class{constructor(){this.m_infos=new Array}getFileData(t,e){let s;{const i=this._parse_pack_data(t);console.log("getFileData : ",i),i&&i.length>0&&(s=this._getFileData(e))}return s}_parse_pack_data(t){if(0!=t.byteLength)return this._parse(t,t.byteLength,0)?this.m_infos:void 0}_getFileData(t){let e,s=!1;for(let e=0;e<this.m_infos.length;e++){if(this.m_infos[e].name==t){s=!0;break}}if(s){const s=this._getFileSize(t);if(0!=s){const i=new Uint8Array(s);this.getFileContent(t,i,s)==s&&(e=i)}}return e}_parse(e,u,h){if(this.m_buf=e,!this.m_buf)return!1;if(u<96)return!1;this.m_infos.length=0;const l=new i;l.parseData(e.slice(0,32));if(a(e,30,2)!=l.u16Crc)return!1;if(a(e,u-32,32)!=l.u16DataCrc)return!1;const o=new i;o.parseData(e.slice(32,64));let c=new i;c.parseData(e.slice(64,96));let f=64;if(c.u32Address>=0&&c.u32Length>0&&c.u32Address<u&&c.u32Length<=u&&o.u32Address>=0&&o.u32Length>0&&o.u32Address<u&&o.u32Length<=u){const a=new s;a.parseData(e.slice(o.u32Address,o.u32Address+25));let h=a.stItem[0],l=o.u32Address+16;if(o.u32Address+16>=u)return!1;if(a.stHead.u32Count>=128)return!1;let d=o.u32Address+16;for(let s=0;s<a.stHead.u32Count;s++){if(d>=u-5)return!1;let s;for(let t=l+4;t<e.byteLength;t++){if(0==e[t]){s=n(e.slice(l+4,t));break}}if(!s)return!1;l+=h.u8Length,h=new t,h.parseData(e.slice(l,l+9));const a=new r(s,c.u32Address,c.u32Length);this.m_infos.push(a),c=new i,f+=32,c.parseData(e.slice(f,f+32))}return!0}return!1}_getFileSize(t){let e;for(let s=0;s<this.m_infos.length;s++){const i=this.m_infos[s];if(i.name===t){e=i;break}}return e&&e.len?e.len:0}getFileContent(t,e,s){if(null==this.m_buf)return 0;let i;for(let e=0;e<this.m_infos.length;e++){const s=this.m_infos[e];if(s.name===t){i=s;break}}if(i){const t=i.len,r=t>s?s:t;return e.set(this.m_buf.slice(i.offset,i.offset+r)),r}return 0}},exports.Uint8ArrayToString=n;
