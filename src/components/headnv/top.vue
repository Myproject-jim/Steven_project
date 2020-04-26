<template>
<div class="headstyle1">
   <Menu mode="horizontal" :theme="theme1" active-name="1" >
         <Row>
        <Col :xs="2" :sm="4" :md="6" :lg="8" class="box animated bounceInDown "><a href=""><div class="title">MTBF Report</div></a> </Col>
        <Col :xs="20" :sm="16" :md="12" :lg="8"><Input search enter-button="Search" placeholder="Enter something..." style="margin-top: 2%; width:70%"/></Col>
        <Col :xs="2" :sm="4" :md="6" :lg="8">
       <div class="headstyle">
        <MenuItem name="1">
            <Icon type="ios-paper" />
            MTBF Report
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            Reoot Report
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                all
            </template>
            <MenuGroup title="MTBF Report">
                <MenuItem name="3-1"></MenuItem>
                <MenuItem name="3-2"></MenuItem>
                <MenuItem name="3-3"></MenuItem>
            </MenuGroup>
            <MenuGroup title="client status">
                <MenuItem name="3-4"></MenuItem>
                <MenuItem name="3-5"></MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            About
        </MenuItem>
            </div>
         </Col>
        </Row>
    </Menu>
</div>
</template>

<script>
export default {

}
</script>

<style>
.headstyle1{
   width: auto;
   height: 0;
   width: 100%;
   position: fixed;
   z-index: 1999;
   top: 0;
    right: 0;
    left: 0;
    display: -ms-flexbox;
     -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
   
}
.headstyle{
    position: relative;
    float: right;
    margin-left: 20%;
}
.title{
        background: linear-gradient(to right, rgb(16, 97, 228), rgb(16, 97, 228));
        -webkit-background-clip: text;
        color: transparent;
        font-size: 25px;
        margin-left: 10px;
        font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
</style>
