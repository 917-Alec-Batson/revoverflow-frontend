import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FeedContainerComponent from './pages/feed-components/feed-container.component';
import ForumContainerComponent from './pages/forum-components/forum-container.component';
import { LoginComponent } from './pages/login.component/login.component';
import { NavbarComponent } from './navbar.component';
import { RichTextEditorComponent } from './pages/forum-components/rich-text-editor-component/draftjs';
import FaqContainerComponent from './pages/faq-components/faq-container.component';

import QuestContainerComponent from './pages/quest-components/quest-container.component';
import Sidebar from './sidebar';

export const MainComponent: React.FC = () => {
    return <div id="main-component">
        <BrowserRouter>
            <main>
                <Switch>
                    <Route exact path="/">
                        <LoginComponent />
                    </Route>
                    <Fragment>
                        <Sidebar />
                        <NavbarComponent />
                        <Route exact path="/feed">
                            <FeedContainerComponent />
                        </Route>
                        <Route exact path="/forum">
                            <ForumContainerComponent />
                        </Route>
                        <Route exact path="/question">
                            <RichTextEditorComponent />
                        </Route>
                        <Route exact path="/faq">
                            <FaqContainerComponent />
                        </Route>
                        <Route exact path="/all-questions">
                            <QuestContainerComponent />
                        </Route>
                    </Fragment>
                </Switch>
            </main>
        </BrowserRouter>
    </div>
}