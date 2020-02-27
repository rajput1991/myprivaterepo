import { Component } from "@angular/core";
import { TableMetaData } from "../table/TableCommonSetting";
import { Option } from "../select/Option.wrapper";


@Component({
  // tslint:disable-next-line:component-selector
  selector: "tas-temp-generator",
  templateUrl: "./template-generator.component.html",
  styleUrls: ["./template-generator.component.css"]
})
export class TemplateGeneratorComponent {
  // myNetworkSettings: TableCommonSetting[];
  // myServerSettings: TableCommonSetting[];
  // myFloatingPointIPSettings: TableCommonSetting[];
  // myPortSettings: TableCommonSetting[];
  // mySubnetSettings: TableCommonSetting[];
  // myrouterInterfaceSettings: TableCommonSetting[];
  // mycinderVolumesSettings: TableCommonSetting[];
  //apiResources;
//   OS::Nova::Server
// OS::Cinder::Volume
// OS::Neutron::FloatingIPAssociation
// OS::Neutron::FloatingIP
// OS::Neutron::Port
// OS::Neutron::RouterInterface
// OS::Neutron::Subnet
// OS::Neutron::Net
// OS::Neutron::RouterGateway
  apiResources: TableMetaData = {
    headers: [
      "id",
      "admin_state_update",
      "dns_domain",
      "name",
      "port_security_enabled",
      "qos_policy",
      "shared",
      "tenant_id"
    ],
    label: 'Networksdue',
    defaultRow: [{
      id: 1,
      admin_state_update: "MGMT",
      dns_domain: "NET1",
      name: "true",
      port_security_enabled: "hpe.corp",
      qos_policy: "NA",
      shared: "MGMT_NET",
      tenant_id: "TAS"
    }]
  };



  hostenviorments: Option[] = [
    { id: "0", name: "OpenStack" },
    { id: "1", name: "AWS" },
    { id: "2", name: "AZURE" },
    { id: "3", name: "GCP" }
  ];
  templateTypes: Option[] = [
    { id: "0", name: "ansible" },
    { id: "1", name: "cloud native" }
  ];
  PROJECTS: any[] = [
    {
      id: 1,
      Network: "MGMT",
      name: "NET1",
      admin_state_up: "true",
      dns_domain: "hpe.corp",
      port_security_enabled: true,
      qos_policy: "NA",
      tags: "MGMT_NET",
      tenant_id: "TAS"
    }
  ];
  servers: any[] = [
    {
      id: 0,
      Network: "MGMT",
      name: "NET1",
      admin_state_up: "true",
      dns_domain: "hpe.corp",
      port_security_enabled: true,
      qos_policy: "NA",
      tags: "MGMT_NET",
      tenant_id: "TAS"
    },
    {
      id: 1,
      Network: "MGMT",
      name: "NET1",
      admin_state_up: "true",
      dns_domain: "hpe.corp",
      port_security_enabled: true,
      qos_policy: "NA",
      tags: "MGMT_NET",
      tenant_id: "TAS"
    }
  ];

  onSelect(event) {
    const hostingEnv = event.srcElement.selectedOptions[0].label;

    console.log("Hosting Env. is : " + hostingEnv);
    if (hostingEnv.toUpperCase() === "OPENSTACK") {
      // tslint:disable-next-line:only-arrow-functions
      // this.myNetworkSettings = [
      //   "admin_state_up",
      //   "dns_domain",
      //   "name",
      //   "port_security_enabled",
      //   "qos_policy",
      //   "shared",
      //   "tenant_id"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
      // // tslint:disable-next-line:only-arrow-functions
      // this.myServerSettings = [
      //   "admin_pass",
      //   "availability_zone",
      //   "diskConfig",
      //   "flavor",
      //   "flavor_update_policy",
      //   "image",
      //   "image_update_policy",
      //   "key_name",
      //   "name",
      //   "networks",
      //   "personality",
      //   "security_groups",
      //   "user_data",
      //   "user_data_format",
      //   "user_data_update_policy"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
      // // tslint:disable-next-line: only-arrow-functions
      // this.myFloatingPointIPSettings = [
      //   "dns_domain",
      //   "dns_name",
      //   "fixed_ip_address",
      //   "floating_ip_address",
      //   "floating_network",
      //   "floating_subnet",
      //   "port_id"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
      // // tslint:disable-next-line: only-arrow-functions
      // this.myPortSettings = [
      //   "admin_state_up",
      //   "binding:vnic_type",
      //   "device_id",
      //   "device_owner",
      //   "dns_name",
      //   "mac_address",
      //   "name",
      //   "network",
      //   "port_security_enabled",
      //   "qos_policy",
      //   "security_groups"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
      // // tslint:disable-next-line:only-arrow-functions
      // this.mySubnetSettings = [
      //   "allocation_pools",
      //   "cidr",
      //   "dns_nameservers",
      //   "enable_dhcp",
      //   "gateway_ip",
      //   "ip_version",
      //   "name",
      //   "network",
      //   "segment",
      //   "subnetpool",
      //   "tenant_id"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
      // this.myrouterInterfaceSettings = ["port", "router", "subnet"].map(
      //   function(value, label) {
      //     return { primaryKey: value, header: value };
      //   }
      // );
      // this.mycinderVolumesSettings = [
      //   "availability_zone",
      //   "description",
      //   "image",
      //   "multiattach",
      //   "name",
      //   "read_only",
      //   "name",
      //   "scheduler_hints",
      //   "size",
      //   "snapshot_id",
      //   "volume_type"
      // ].map(function(value, label) {
      //   return { primaryKey: value, header: value };
      // });
    } else if (hostingEnv.toUpperCase() === "AWS") {
      // this.myNetworkSettings = [];
      // this.myServerSettings = [];
      // this.myFloatingPointIPSettings = [];
    } else if (hostingEnv.toUpperCase() === "GCP") {
      // this.myNetworkSettings = [];
      // this.myServerSettings = [];
      // this.myFloatingPointIPSettings = [];
    } else if (hostingEnv.toUpperCase() === "GCP") {
      // this.myNetworkSettings = [];
      // this.myServerSettings = [];
      // this.myFloatingPointIPSettings = [];
    } else if (hostingEnv.toUpperCase() === "AZURE") {
      // this.myNetworkSettings = [];
      // this.myServerSettings = [];
      // this.myFloatingPointIPSettings = [];
    } else {
      alert("Please select the hosting enviorment...");
    }
  }

  tablechanged(data) {
    // alert("coming");
  }

  buildTemplate(resources) {
    const templateVersion = 'heat_template_version: 2015-04-30';
    const resourceType = 'OS:: Neutron:: Net';
    const n0 = '\n';
    let template;
    // tslint:disable-next-line: only-arrow-functions
    resources.forEach(function (element, i)
    {
      console.log('------ RESOURCE START ------');
      template = templateVersion;
      template += n0 + '  type: ' + resourceType;
      // tslint:disable-next-line:align
      template += n0 + '  properties:';
      // tslint:disable-next-line: forin
      for (const key in element) {
        template += n0 + '    ' + key + ': ' + element[key];
      }
      console.log(template);
      console.log('------ RESOURCE END  ------');
    });
  }
}
