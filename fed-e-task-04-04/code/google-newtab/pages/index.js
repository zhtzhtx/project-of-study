import React, { useState, useEffect } from 'react'
import { container, main, mostVisited } from "../styles/style"
import SearchInput from "../components/SearchInput";
import SearchItem from "../components/SearchItem";
import Mask from "../components/Mask";
import Dialog from "../components/Dialog";

export default function Home() {
  const [isShow, setShow] = useState(false)
  const [dataList, setDataList] = useState([])
  const [initalDialogData, setInitData] = useState(null)
  const [showList, setShowList] = useState(null)

  const getFaviconByWebUrl = (data) => {
    let icon = ""
    if (typeof document !== "undefined") {
      if (data.url.startsWith("http")) {
        icon = data.url + "/favicon.ico"
      } else if (data.url.startsWith("www")) {
        data.url = "http://" + data.url
        icon = data.url + "/favicon.ico";
      }
    }
    return icon;
  };
  const showDialog = () => {
    setShow(true)
    setInitData(null)
  }
  const addLink = (data) => {
    let newArr = [...dataList]
    let icon = getFaviconByWebUrl(data)
    data.icon = icon
    newArr.push(data)
    window.localStorage.setItem("tabList", JSON.stringify(newArr))
    setDataList(newArr)
  }
  const handleLink = (data) => {
    window.location.href = data.url;
  };
  const handleDel = (index) => {
    let newArr = dataList.filter((data, i) => i !== index)
    window.localStorage.setItem("tabList", JSON.stringify(newArr))
    setDataList(newArr)
  }
  const handleEdit = (index) => {
    let data = dataList.find((data, i) => i === index)
    setInitData(data)
    setShow(true)
  }
  const isShowList = (flag) => {
    setShowList(flag)
  }
  useEffect(() => {
    const tabList = window.localStorage.getItem("tabList")
    const initalList = tabList ? JSON.parse(tabList) : []
    setDataList(initalList)
  }, [])
  return (
    <div css={container} onClick={() => isShowList(false)}>
      <div css={main}>
        <img src="/google_logo.svg"></img>
        <SearchInput />
        <div css={mostVisited}>
          {dataList.map((data, index) => {
            return <SearchItem
              isInit={false}
              icon={data.icon}
              content={data.name}
              index={index} 
              key={index}
              showList={showList}
              setShowList={(i) => setShowList(i)}
              handleClick={() => handleLink(data)}
              handleDel={() => handleDel(index)}
              handleEdit={() => handleEdit(index)}
            />
          })
          }
          <SearchItem
            isInit={true}
            icon="/add.svg"
            content="添加快捷方式"
            handleClick={showDialog}
          />
        </div>
        {
          isShow
            ?
            <>
              <Mask />
              <Dialog
                initalData={initalDialogData}
                setDialog={(flag) => setShow(flag)}
                addQuickLink={(data) => addLink(data)}
              />
            </>
            : null
        }

      </div>
    </div>
  )
}
