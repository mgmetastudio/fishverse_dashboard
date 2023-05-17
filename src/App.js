import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "react-dates/lib/css/_datepicker.css";
import "./styles/app.sass";
import Page from "./components/Page";
import Authentification from "./screens/Authentification";
import Marketplace from "./screens/Marketplace";
import Overview from "./screens/Overview";
import NFT from "./screens/NFT";
import IdoClaim from "./screens/IdoClaim";
import Settings from "./screens/Settings";
import Scores from "./screens/Scores";
import Swap from "./screens/Swap";
import DownloadGame from "./screens/DownloadGame";
import Staking from "./screens/Staking/index";
import NotFound from "./screens/NotFound";
import YourStakes from "./screens/YourStakes";
import ReferralProgram from "./screens/ReferralProgram";
import DailyQuests from "./screens/DailyQuests";
import { RecoilRoot } from "recoil";

function requireAuth(component) {
    if (!localStorage.getItem('principal')) {
        return Redirect("/");
    }
    return component;
}

function App({ Component, pageProps }) {
    return (
        <RecoilRoot>
            <Router {...pageProps}>
                <Switch>
                    <Route exact path="/" render={() => {
                        if (!localStorage.getItem('principal')) {
                            return (<Page>
                                <Authentification />
                            </Page>)
                        }
                        return (<Page>
                            <Redirect to="/overview" />
                        </Page>)
                    }} />
                    <Route exact path="/overview" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Overview />
                            </Page>)
                    )}
                    />
                    <Route exact path="/marketplace" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Marketplace />
                            </Page>)
                    )}
                    />
                    <Route exact path="/wallet" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <NFT />
                            </Page>)
                    )}
                    />
                    <Route exact path="/ido-claim" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <IdoClaim />
                            </Page>)
                    )}
                    />
                    <Route exact path="/swap" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Swap />
                            </Page>)
                    )}
                    />
                    <Route exact path="/leaderboard" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Scores />
                            </Page>)
                    )}
                    />
                    <Route exact path="/settings" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Settings />
                            </Page>)
                    )}
                    />
                    <Route exact path="/download" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <DownloadGame />
                            </Page>)
                    )}
                    />
                    <Route exact path="/daily-quests" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <DailyQuests />
                            </Page>)
                    )}
                    />
                    <Route exact path="/referral-program" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <ReferralProgram />
                            </Page>)
                    )}
                    />
                    <Route exact path="/stake-fvs" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <Staking />
                            </Page>)
                    )}
                    />
                    <Route exact path="/my-stakes" render={() => (
                        requireAuth(
                            <Page withMainLayout={true}>
                                <YourStakes />
                            </Page>)
                    )}
                    />
                    <Route path="*" render={() => (
                        <Page>
                            <NotFound />
                        </Page>
                    )}
                    />
                </Switch>
            </Router>
        </RecoilRoot>
    );
}

export default App;
