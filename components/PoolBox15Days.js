import Waterfall from "../public/images/pool_icon.png";
import {
  ChevronUpIcon,
  ExternalLinkIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import Image from "next/image";
import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { PregmaContext } from "../contexts/PregmaContext";
import { Box, Grommet, Stack, TextInput, Text } from "grommet";
import customTheme from "../config/customTheme";

const PoolBox15Days = () => {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState("stake"); // stake || unstake
  const [amount, setAmount] = useState(undefined);

  const {
    isApprovedDeposit,
    approveDepositToken,
    stakePool,
    unstakePool,
    harvest,
    getMaxStakingDeposit,
    getMaxUnstakingDeposit,
    stakePool15Days,
    unstakePool15Days,
    harvest15Days,
    rewardAmountPool15Days,
    stakedAmountPool15Days,
    totalStakedPool15Days,
    vaultRewardPool15Days,
    connected,
    connectMetaMask,
    approveDepositToken15Days,
    isApprovedDeposit15Days,
    yourBalanceLp,
  } = useContext(PregmaContext);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e00ff",
      },
      secondary: {
        light: "#0066ff",
        main: "#0044ff",
        contrastText: "#ffcc00",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  const handleChange = (event, newValue) => {
    //event.preventDefault();
    setValue(newValue);
  };

  function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  return (
    <>
      <div
        className="bg-gray-900 flex flex-col rounded p-6 shadow-xl left-side-box"
        data-aos="zoom-in"
      >
        <div className="flex flex-row justify-between gap-10">
          <Image src={Waterfall} layout="fixed" height="43px" width="67px" />
          <div className="place-end ">
            <h3 className="text-custom-100 font-bold text-2xl tracking-wider">
              PUMPKIN
            </h3>
            <div className="flex flex-row gap-1 justify-end">
              <div className="bg-gradient-to-t from-blue-900 to-cyan-500 text-gray-800 font-bold text-center px-1 rounded text-sm">
                APY {"1,648,803"}%
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-3">
          <span className="text-custom-100 text-lg tracking-wider">Earn:</span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            PUMPKIN
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-custom-100 text-lg tracking-wider">
            Locking Period:
          </span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            15 Days
          </span>
        </div>
        <div className="flex flex-row justify-between">
          <span className="text-custom-100 text-lg tracking-wider">
            Your spLP Balance:
          </span>
          <span className="text-custom-100 text-lg font-medium tracking-wider">
            {nFormatter(yourBalanceLp, 2)}
          </span>
        </div>
        <div className="flex flex-row justify-between"></div>

        {!connected ? (
          <>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                PUMPKINS EARNED
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-center">
                <span className="mt-2 text-custom-100 text-2xl tracking-wider">
                  0
                </span>
                {/* 
                <span className="text-custom-100 text-xs tracking-wider">
                  ~$123.124 USD
                </span>
                */}
              </div>
              {/* 
              <button className="tracking-wider bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded">
                Harvest
              </button> */}
              <button className="mt-2 cursor-not-allowed tracking-wider bg-transparent text-custom-100 font-semibold py-2 px-4 border-2 border-cyan-500 rounded">
                Claim
              </button>
            </div>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                spLP STAKED
              </span>
            </div>
            <div className="flex flex-row justify-center">
              <>
                <button
                  className="mt-2 bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    connectMetaMask();
                  }}
                >
                  <h1 className="text-lg">Connect Wallet</h1>
                </button>
              </>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                PUMPKINS EARNED
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-col text-center">
                <span className="text-custom-100 text-2xl tracking-wider">
                  {rewardAmountPool15Days}
                </span>
              </div>

              <div className="flex flex-col">
                {Number(rewardAmountPool15Days) > 0 ? (
                  <>
                    <button
                      className="tracking-wider bg-transparent hover:bg-cyan-500 text-custom-100 font-semibold hover:text-white py-2 px-4 border-2 border-cyan-500 hover:border-transparent rounded"
                      onClick={async (e) => {
                        e.preventDefault();
                        await harvest15Days(amount);
                      }}
                    >
                      Claim
                    </button>
                  </>
                ) : (
                  <>
                    <button className="mt-2 cursor-not-allowed tracking-wider bg-transparent text-custom-100 font-semibold py-2 px-4 border-2 border-cyan-500 rounded">
                      Claim
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-row justify-start mt-3">
              <span className="text-custom-100 text-xs tracking-wider">
                spLP STAKED
              </span>
            </div>
            {!isApprovedDeposit15Days ? (
              <>
                <button
                  className="mt-2 w-100 py-2 hover:bg-transparent text-sm bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                  onClick={async (e) => {
                    e.preventDefault();
                    await approveDepositToken15Days();
                  }}
                >
                  Approve Contract
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col text-center">
                    <span className="text-custom-100 text-2xl tracking-wider">
                      {stakedAmountPool15Days}
                    </span>
                  </div>
                  {Number(stakedAmountPool15Days) > 0 ? (
                    <>
                      <button
                        className="w-100 py-2 hover:bg-transparent text-sm bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                        onClick={async (e) => {
                          e.preventDefault();
                          await unstakePool15Days();
                          setAmount(undefined);
                        }}
                      >
                        Claim & Unstake
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="cursor-not-allowed w-100 py-2   text-sm bg-cyan-500 text-custom-100 font-semibold   px-4 border-2 hover:border-cyan-500 border-transparent rounded">
                        Claim & Unstake
                      </button>
                    </>
                  )}
                </div>

                <div className="flex flex-row justify-center mt-6 gap-2 rounded">
                  <Box round="large">
                    <Grommet
                      theme={customTheme}
                      style={{
                        backgroundColor: "#111",
                        color: "#fff",
                      }}
                      round="large"
                    >
                      <div className="rounded  shadow-xl shadow-cyan-500/90">
                        <Stack anchor="right" round="large">
                          <Box round="large">
                            <TextInput
                              size="xsmall"
                              placeholder="amount"
                              value={amount}
                              onChange={(event) => {
                                event.preventDefault();
                                setAmount(event.target.value);
                              }}
                              reverse
                            />
                          </Box>
                          <Box
                            onClick={async () => {
                              setAmount(await getMaxStakingDeposit());
                            }}
                            margin={{
                              right: "10px",
                            }}
                          >
                            <Text className="font-bold" size="small">
                              Max
                            </Text>
                          </Box>
                        </Stack>
                      </div>
                    </Grommet>
                  </Box>
                  <button
                    className="w-min text-sm hover:bg-transparent bg-cyan-500 text-custom-100 font-semibold hover:text-white px-4 border-2 hover:border-cyan-500 border-transparent rounded"
                    onClick={async (e) => {
                      e.preventDefault();
                      await stakePool15Days(amount);

                      setAmount(0);
                    }}
                  >
                    Stake
                  </button>
                </div>
              </>
            )}
          </>
        )}

        <div
          className="flex flex-row text-gray-800 justify-center items-center mt-10"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <>
            <span className="tracking-widest text-lg">Details</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </>
        </div>

        <>
          <div className="flex flex-col gap-0">
            <div className="pt-1 flex flex-row justify-between w-full">
              <span className="text-custom-100 text-lg tracking-wider">
                Get spLP:
              </span>
              <span className="text-custom-100 text-lg  font-medium tracking-wider">
                <a
                  className="flex flex-row align-center"
                  href="https://spooky.fi/#/add/0xAD522217E64Ec347601015797Dd39050A2a69694/FTM"
                >
                  <p>spLP</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </span>
            </div>

            <div className="flex flex-row justify-between">
              <a
                className="text-cyan-500 text-lg tracking-widest"
                href="https://ftmscan.com/address/0x984D4Bc0DfCcAB38E4d26438De69342939D06618"
              >
                View on FtmScan
              </a>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default PoolBox15Days;
