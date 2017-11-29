<?php

namespace Portal\Controller;
use Common\Controller\HomebaseController;

class AboutController extends HomebaseController {


    public function index() {
        $this->display(":about");
    }

    /*
     * 联系我们
     * */
    public function contact()
    {

        $this->display(":contact");
    }

    /*
     * 团队介绍
     * */
    public function support()
    {
        $this->display(":support");
    }

}